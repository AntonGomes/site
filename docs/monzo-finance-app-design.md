# Bespoke Monzo Personal Finance App — Design

Status: draft for review
Date: 2026-09-20

## 1. Summary

A single-user personal finance app built on the Monzo Developer API, running locally
on my own machine. It keeps a complete local copy of my transaction history — including
history older than the 90 days Monzo will hand out after the initial sync window — and
builds three things on top of it:

- a spending dashboard (spend over time, by merchant, by category),
- budgets with alerts pushed back into the Monzo app feed,
- net worth and savings-rate tracking across the account and pots.

### Decisions already made

| Decision | Choice | Why |
|---|---|---|
| Hosting | Local-only, separate private repo | Bank data never leaves the machine; no secrets near the public `site` repo; no hosting bill |
| Storage | SQLite file on disk | Single user, single machine, zero ops, trivially backed up |
| Stack | Next.js (App Router) + TypeScript + Tailwind + Recharts, `better-sqlite3` | Matches the stack I already use on `site`; one process serves both UI and sync |
| Distribution | None. Never published | The Monzo Developer API forbids it (§2.1) |

### Cost

Free. There is no pricing tier for the Monzo Developer API and no charge for
registering an OAuth client. The constraints are regulatory and technical, not financial.

## 2. The constraints that shape this design

Everything below is from Monzo's official API reference. These are not incidental —
three of them dictate the architecture outright.

### 2.1 Personal use only

> **The Monzo Developer API is not suitable for building public applications.**
> You may only connect to your own account or those of a small set of users you explicitly allow.

Serving other people's accounts requires FCA authorisation as an Account Information
Service Provider and use of the separate Open Banking API. This app is for one account.
It stays unpublished and the repo stays private.

### 2.2 The five-minute history window — the critical constraint

> After a user has authenticated, your client can fetch all of their transactions, and
> after 5 minutes, it can only sync the last 90 days of transactions. If you need the
> user's entire transaction history, you should consider fetching and storing it right
> after authentication.

Full history is available **only in the five minutes immediately after Strong Customer
Authentication**. After that the API will return at most 90 days, permanently.

This is the whole reason the app owns a local database rather than querying Monzo live.
It also means the very first run is a time-boxed operation that has to work, and §5 is
devoted to it.

It is recoverable: a fresh re-authentication opens a fresh five-minute window, so a
failed backfill can be retried. But each retry costs an SCA approval, so it should be
built to succeed on the first attempt.

### 2.3 One active access token per user, per client

> Your client may only have *one* active access token at a time, per user. Acquiring a
> new access token will invalidate any other token you own for that user.

Practical consequence: generating a token in the Monzo API playground while the app is
running will silently kill the app's token. Once the app is live, the playground is off
limits for this client.

### 2.4 Refresh tokens rotate, and rotation is single-use

> Refreshing an access token will invalidate the previous token, if it is still valid.
> Refreshing is a one-time operation.

Access tokens expire (`expires_in: 21600`, i.e. ~6 hours). Each refresh returns a *new*
refresh token and burns the old one. If the app fetches a new token pair and crashes
before persisting it, access is lost and a full re-auth is needed. The token store must
be written atomically, before the new access token is used for anything. See §6.2.

The client must be registered as **Confidential** — non-confidential clients are not
issued refresh tokens at all, which would mean re-authenticating every six hours.

### 2.5 Access is granted asynchronously

> We don't grant any permissions to the access token until the owner of the account that
> your client wants to access has approved access to their data in the Monzo app.

Exchanging the authorization code yields a token with *no permissions*. Calls return
`403` until the push notification in the Monzo app is approved with PIN/Face ID. The app
must poll rather than assume, and the five-minute clock starts at approval, not at
token exchange.

### 2.6 Categories are the legacy, narrow set

The Developer API returns a fixed, older category enum: `general`, `eating_out`,
`expenses`, `transport`, `cash`, `bills`, `entertainment`, `shopping`, `holidays`,
`groceries`. The Monzo app's own richer categories are not exposed here.

So categorisation is a local concern: store Monzo's category as given, and layer local
re-categorisation rules on top (§7.1).

### 2.7 Other limits

- **Rate limiting** exists (`429 Too Many Requests`) but no numeric limit is published.
  Assume it is tight, serialise requests, and back off exponentially on 429.
- **Webhooks require a public URL.** A local-only app can't receive them, so sync is
  poll-based. A tunnel could be added later if live push becomes worth the complexity.
- **Balance has no history.** `GET /balance` is a point-in-time reading. Historical net
  worth must be reconstructed and snapshotted locally (§7.3).
- **No payments.** The API can move money between my own account and my own pots
  (`PUT /pots/:id/deposit` / `/withdraw`), but cannot pay third parties. Out of scope
  anyway — this app is read-and-analyse, with the one exception of writing feed items.

## 3. Architecture

    ┌─────────────────────────────────────────────┐
    │  Next.js app (localhost:3000)               │
    │                                             │
    │  /            dashboard, budgets, net worth │
    │  /api/auth/*  OAuth start + callback        │
    │  /api/sync    manual sync trigger           │
    └───────────────┬─────────────────────────────┘
                    │
        ┌───────────┴───────────┐
        │  core/ (plain TS)     │   ← no Next.js imports; callable from CLI
        │   monzo/  API client  │
        │   sync/   backfill    │
        │   rules/  budgets     │
        │   store/  SQLite      │
        └───────────┬───────────┘
                    │
              monzo.db (SQLite, 0600)

Two entry points share one core:

- **The web UI**, for looking at things. Run on demand with `npm run dev`.
- **A headless CLI** (`npm run sync`), run by `launchd`/`cron` a few times a day. This is
  what keeps data fresh and fires budget alerts when the UI isn't open — without it,
  a local-only app only notices things while I happen to be looking at it.

Keeping `core/` free of framework imports is what makes the same sync logic usable from
both, and testable without a server.

## 4. Data model

SQLite. All money is stored as **integer minor units** (pence) exactly as the API returns
it — never floats, never pounds. Negative is a debit, positive a credit.

```sql
-- Token store. Single row. Written atomically on every refresh.
CREATE TABLE oauth_token (
  id             INTEGER PRIMARY KEY CHECK (id = 1),
  access_token   TEXT NOT NULL,
  refresh_token  TEXT NOT NULL,
  expires_at     TEXT NOT NULL,     -- RFC3339
  user_id        TEXT NOT NULL,
  updated_at     TEXT NOT NULL
);

CREATE TABLE accounts (
  id           TEXT PRIMARY KEY,
  description  TEXT,
  account_type TEXT,                -- uk_retail, uk_retail_joint
  created      TEXT,
  closed       INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE merchants (
  id        TEXT PRIMARY KEY,
  name      TEXT,
  category  TEXT,
  emoji     TEXT,
  logo      TEXT,
  group_id  TEXT,                   -- groups chain locations; use for "by merchant"
  address   TEXT,                   -- JSON
  raw       TEXT NOT NULL           -- full JSON as returned
);

CREATE TABLE transactions (
  id             TEXT PRIMARY KEY,
  account_id     TEXT NOT NULL REFERENCES accounts(id),
  created        TEXT NOT NULL,     -- RFC3339
  settled        TEXT,              -- empty string in API = authorised, not settled
  amount         INTEGER NOT NULL,  -- minor units
  currency       TEXT NOT NULL,
  local_amount   INTEGER,
  local_currency TEXT,
  description    TEXT,
  notes          TEXT,
  category       TEXT,              -- Monzo's legacy enum (§2.6)
  merchant_id    TEXT REFERENCES merchants(id),
  is_load        INTEGER NOT NULL DEFAULT 0,
  decline_reason TEXT,              -- present only on declines; exclude from spend
  raw            TEXT NOT NULL      -- full JSON; Monzo does not document every field
);
CREATE INDEX idx_tx_created ON transactions(created);
CREATE INDEX idx_tx_account_created ON transactions(account_id, created);
CREATE INDEX idx_tx_merchant ON transactions(merchant_id);

CREATE TABLE pots (
  id         TEXT PRIMARY KEY,
  account_id TEXT NOT NULL,
  name       TEXT,
  style      TEXT,
  balance    INTEGER NOT NULL,
  currency   TEXT,
  deleted    INTEGER NOT NULL DEFAULT 0,
  updated    TEXT
);

-- Point-in-time snapshots. The only source of net-worth history (§7.3).
CREATE TABLE balance_snapshots (
  taken_at      TEXT NOT NULL,
  account_id    TEXT NOT NULL,
  balance       INTEGER NOT NULL,   -- account only
  total_balance INTEGER NOT NULL,   -- account + all pots
  PRIMARY KEY (taken_at, account_id)
);
CREATE TABLE pot_balance_snapshots (
  taken_at TEXT NOT NULL,
  pot_id   TEXT NOT NULL,
  balance  INTEGER NOT NULL,
  PRIMARY KEY (taken_at, pot_id)
);

-- Local re-categorisation on top of Monzo's narrow enum.
CREATE TABLE category_rules (
  id         INTEGER PRIMARY KEY,
  priority   INTEGER NOT NULL DEFAULT 100,
  match_type TEXT NOT NULL,         -- merchant_id | merchant_group | description_regex
  match_value TEXT NOT NULL,
  category   TEXT NOT NULL
);

CREATE TABLE budgets (
  id         INTEGER PRIMARY KEY,
  name       TEXT NOT NULL,
  category   TEXT,                  -- local category, or NULL for an overall budget
  period     TEXT NOT NULL,         -- monthly | weekly
  start_day  INTEGER DEFAULT 1,     -- pay-cycle start, not necessarily the 1st
  limit_minor INTEGER NOT NULL,
  alert_at   TEXT NOT NULL DEFAULT '0.8,1.0',  -- fractions of limit
  active     INTEGER NOT NULL DEFAULT 1
);

-- Dedupe guard: one alert per budget per threshold per period.
CREATE TABLE alerts_sent (
  budget_id   INTEGER NOT NULL,
  period_key  TEXT NOT NULL,        -- e.g. 2026-09
  threshold   REAL NOT NULL,
  sent_at     TEXT NOT NULL,
  PRIMARY KEY (budget_id, period_key, threshold)
);

CREATE TABLE sync_state (
  account_id      TEXT PRIMARY KEY,
  last_synced_at  TEXT,
  oldest_backfilled TEXT,           -- earliest transaction we hold
  backfill_complete INTEGER NOT NULL DEFAULT 0
);
```

Two deliberate choices worth noting:

- **`raw` JSON on transactions and merchants.** Monzo's docs openly say they haven't
  documented every property. Storing the raw payload means a later feature can use a
  field I didn't think to model, without needing history I can no longer fetch.
- **`merchants.group_id`** is what makes "by merchant" useful — it groups every Pret
  branch into one merchant rather than forty.

## 5. The cold-start backfill

This is the part that has to be right. It runs once, against a five-minute clock, and
what it misses is not retrievable later without a fresh SCA approval.

**Sequence**

1. `GET https://auth.monzo.com/?client_id=…&redirect_uri=…&response_type=code&state=…`
   with a random `state` held in a short-lived cookie.
2. Callback verifies `state` matches — abort if not — and exchanges `code` at
   `POST /oauth2/token` (`grant_type=authorization_code`).
3. Persist the token pair immediately.
4. **Wait for SCA.** Poll `GET /accounts` every 2s. `403` means not yet approved; the
   UI shows "approve the notification in your Monzo app". A `200` starts the clock.
5. **The clock starts. Backfill immediately**, before rendering anything, before fetching
   pots, before anything optional.

**Backfill loop**, per account, oldest-ward:

```
cursor = now
loop:
  GET /transactions?account_id=…&limit=100&before=<cursor>&expand[]=merchant
  if empty -> done
  INSERT OR REPLACE all rows in one SQLite transaction
  cursor = created of the oldest row returned
  on 429 -> exponential backoff, retry (backoff counts against the 5 minutes)
```

Four things this gets right:

- **`expand[]=merchant` during the backfill, not after.** Unexpanded, `merchant` is just
  an id. Enriching later would be impossible for transactions older than 90 days, because
  by then I can't re-read them. Merchant data must be captured in the same pass.
- **`limit=100`** is the documented maximum — use all of it. A decade of transactions at
  100/request is a few hundred sequential calls, comfortably inside five minutes at normal
  latency.
- **Commit each page as it arrives.** A failure at minute four keeps everything fetched
  up to that point; a resumed run only needs the remainder.
- **Nothing else runs concurrently.** Pots, balance, UI hydration all wait. The only
  work in the window is pulling history.

Afterwards, out of the window and at leisure: pots, balance, the first snapshot, derived
tables, first render. Then set `backfill_complete = 1` and record `oldest_backfilled`.

**If it fails**, the app says so plainly and offers a re-auth, which opens a new window
and resumes from `oldest_backfilled`. It must never silently mark itself complete —
a half-backfill that looks finished is the one failure mode that quietly destroys the
thing the app exists to preserve.

## 6. Ongoing sync

### 6.1 Incremental

Run from the CLI on a schedule (say 4x/day) and on UI load if stale:

1. Refresh the access token if within 10 minutes of expiry (§6.2).
2. `GET /transactions?account_id=…&since=<last_synced_at minus 7 days>&expand[]=merchant`
   — the overlap re-reads recent transactions so that changes to already-seen rows
   (settlement, a category edit, notes added in the app) are picked up. `INSERT OR REPLACE`
   on the primary key makes this idempotent.
3. `GET /balance`, `GET /pots` → write snapshots.
4. Re-apply category rules to new rows.
5. Evaluate budgets; send any alerts due (§7.2).
6. Update `sync_state.last_synced_at`.

Pending transactions (`settled` empty) are included but flagged in the UI, since the
amount can still change.

### 6.2 Token lifecycle

```
refresh():
  POST /oauth2/token grant_type=refresh_token
  -> on success: write BOTH new tokens to oauth_token in a single SQLite
     transaction, and only then return the new access token
  -> on 401/invalid_grant: tokens are dead. Mark state as needs_reauth and
     surface a "reconnect Monzo" prompt. Do NOT retry — retrying a burnt
     refresh token cannot succeed.
```

The ordering is the point (§2.4). Persist before use, never the reverse.

The app should also hold a lock (a file lock on the db, or `better-sqlite3`'s own
serialisation) so the UI and the cron job can't both refresh at once — two concurrent
refreshes mean one of them burns the other's token.

## 7. Features

### 7.1 Spending dashboard

Because the app holds full history rather than Monzo's 90-day view, the dashboard's
whole selling point is depth of time.

- **Spend over time** — monthly and weekly bars, with a 3-month trailing average line.
  Excludes: declines (`decline_reason` present), top-ups (`is_load = true`), pot
  transfers, and transfers between my own accounts. Getting these exclusions right is
  most of what makes the number believable.
- **By category** — using the local category (rule-derived, falling back to Monzo's),
  as a stacked area over time rather than a single pie, so drift is visible.
- **By merchant** — grouped by `merchant.group_id`, with total, frequency, average
  spend and first/last seen. "£1,840 at Pret across 213 visits since 2021" is the kind
  of thing only the full backfill can tell me.
- **Drill-down** to the transaction list on every chart element.
- **Category rules editor** — a rule maps a merchant, merchant group or description
  regex to a local category. Rules are re-applied to the whole history on save, which is
  cheap locally and means recategorising is retroactive.

### 7.2 Budgets and alerts

Budgets are local rules over the synced data — Monzo's own budget feature isn't exposed
by the API, so this is independent of it.

- A budget is a limit per category (or overall) per period, with the period aligned to
  a configurable pay-cycle start day rather than the calendar month.
- The dashboard shows progress: spent, remaining, days left, and projected end-of-period
  spend at the current rate.
- **Alerts are delivered as Monzo feed items** — `POST /feed` with `type=basic` — so they
  appear in the actual Monzo app rather than in a web page I'm not looking at. This is
  the one write this app makes to Monzo.
  - `params[image_url]` is **required and must be publicly reachable**. A localhost app
    can't serve it, so the icon will be a static URL on my existing public site.
  - `params[url]` can deep-link back to `http://localhost:3000/budgets/<id>`, which works
    if I tap it on the machine running the app.
- `alerts_sent` enforces one alert per budget per threshold per period, so a sync running
  four times a day doesn't send four identical notifications.
- Alerts fire from the CLI sync job. Without that scheduled job, alerts only happen when
  the UI is open — which defeats the purpose.

### 7.3 Net worth and savings tracking

The API gives no balance history, so this is built two ways:

**Backwards (reconstruction).** Current account balance is known; every transaction is
known. Walking backwards subtracting each transaction reconstructs the account balance
on any past date, right back to the start of the backfill. This gives an immediate
multi-year chart on day one rather than starting from zero.

This is reliable for the *account*. It is **not** reliable for pots: interest and some
pot movements don't necessarily appear as account transactions, so reconstructed pot
balances would drift. Pot history therefore starts from first snapshot — an honest
limitation, and the chart should mark where reconstruction ends and observation begins
rather than implying a single continuous source.

**Forwards (snapshots).** Every sync writes `balance_snapshots` and
`pot_balance_snapshots`. Over time these become the authoritative record.

Derived views:

- Total balance over time (`total_balance` = account + pots).
- Savings rate per month: `(income − spend) / income`, with income defined as credits
  that aren't refunds, transfers or top-ups — a definition that will need a manual
  override for edge cases, so make it inspectable.
- Pot growth per pot, and contributions vs. interest where distinguishable.
- Optional manual accounts (pension, ISA, non-Monzo current account) as hand-entered
  periodic values, so "net worth" means net worth. Clearly marked as manual.

## 8. Security

For an app whose database is a complete record of everywhere I have been and everything
I have bought, the bar is higher than for a normal side project.

- **Private repo. Never published.** Required by Monzo's terms (§2.1) and by common sense.
- `.gitignore`: `*.db`, `*.db-wal`, `*.db-shm`, `.env*`, `/backups`. Committed from the
  first commit, before the database can ever exist.
- **Secrets in `.env.local` only**, never in code, never in this repo, never pasted into
  a chat window. `MONZO_CLIENT_ID`, `MONZO_CLIENT_SECRET`, `MONZO_REDIRECT_URI`.
- **Tokens live in SQLite**, not `.env` — they rotate, and a rotating value doesn't
  belong in a config file. The db file is `chmod 0600`. Optional upgrade: encrypt the
  token row with a key from the macOS Keychain.
- **Binds to `127.0.0.1` only.** Never `0.0.0.0` — a dev server casually exposed on a
  café wifi is the whole threat model in one line.
- **No telemetry, no analytics, no third-party scripts, no external fonts.** Every
  outbound request is either to `api.monzo.com` or is a bug.
- **Backups** are of an unencrypted financial database — so they go to an encrypted disk,
  not a cloud sync folder.
- Since the redirect URI is `http://localhost:3000/api/auth/callback`, the OAuth callback
  only works locally. That's a feature.

## 9. Build plan

| # | Milestone | Contents |
|---|---|---|
| 1 | **Auth + backfill** | OAuth flow, SCA polling, the five-minute backfill, schema, token refresh. Verified against the real account. Nothing else matters until this is proven. |
| 2 | **Sync + CLI** | Incremental sync, snapshots, `npm run sync`, scheduled job. |
| 3 | **Dashboard** | Spend over time, by category, by merchant, drill-down, category rules. |
| 4 | **Budgets + alerts** | Budget CRUD, progress, feed-item alerts, dedupe. |
| 5 | **Net worth** | Reconstruction, snapshot charts, savings rate, manual accounts. |

Milestone 1 is deliberately the largest and is where the risk is concentrated. It is
also the only part with a hard deadline built into it.

## 10. Open questions

1. **How far back does the history go?** Account age determines backfill size and whether
   five minutes is comfortable or tight. Worth knowing before the first run.
2. **Joint account?** If there's a `uk_retail_joint` account, it needs including in
   accounts, dashboard splits, and net worth.
3. **Pay cycle** — does the budget month start on the 1st, or on a payday?
4. **Manual non-Monzo accounts in net worth from the start, or later?**
5. **Machine** — is this on a laptop that sleeps? If so the scheduled sync should be
   `launchd` with `StartInterval` (which catches up after wake) rather than plain `cron`
   (which silently doesn't).

## References

- [Monzo API Reference](https://docs.monzo.com/) — endpoints, SCA warnings, token semantics
- [monzo/docs](https://github.com/monzo/docs) — source of the above
- [Monzo developer tools](https://developers.monzo.com/) — client registration
- [FCA: Account Information Services](https://www.fca.org.uk/account-information-service-ais-payment-initiation-service-pis) — what publishing this would require
