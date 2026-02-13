---
title: Math of Music 1 
description: A rambling exploration of links between maths and music. Warning{:} will enrage both mathematicians and musicians. 
date: 13/2/2026
readTime: 792
---

I'm currently trying to learn the harmonica and am really enjoying it, however I have very limited understanding of how music actually *works*. I was a choir boy for a few years in school [^1] so I can still just about sight-read a treble scale (FACE for the gaps, I forget the pneumonic for the lines, something like All Good Boys Deserve Fun?) and my brief attempts at learning the trumpet and piano have left some inkling of an understanding of harmonics as a circular structure, but beyond this I have no idea. 

What I'm hoping is that there is some interesting structure to harmony and melody that can be represented mathematically, and maybe (just maybe!) this will help me on my tin sandwich escapade. I'm going to document my learning process because I want to get a better idea of how I go about learning something, but I'd also like to think that this may help my mathematically inclined brethren on their musical journey too. 

# Starting somewhere

Where else to begin but good old Google, I'm going to smash some buzzwords into the search bar and I will report back. 

I've found a wikipedia called [Music and Mathematics](https://en.wikipedia.org/wiki/Music_and_mathematics#cite_note-20) which seems like a great place to start. Wikipedia tends to get a bad rep sometimes but I've always found that it is excellent for mathematics, and regardless we can always check the sources. 

So funnily enough I'm not the first person to ever be interested in this, in fact the Pythagoreans investigated musical scales as *ratios* and even made this study central to their doctrine:

> "All nature consists of harmony arising out of numbers."

I'm learning that a scale is a set of pitches, each with a certain frequency (Hz). Scales repeat after exactly twice the frequency of the starting pitch, this is an octave. This must be where the Pythagoreans love of ratios comes from, octaves occur at a ratio of double the starting pitch, not after a set increment increase - news to me!

# Octaves are quotient spaces?

A note is the collective identity of a repeat pitch, for example $A_1$ is 110Hz and $A_2$ is 220Hz, but these are both the note $A$. This reminds me of the mathematical concept of a quotient or identification space $\mathbb{R}_{>0}/\sim$  where the equivalence relation $\sim$ is defined by $x\sim 2x$. This is a fancy way of saying that musical notes are the set of real numbers where if $x$ is a positive real number, the $x$ is the same as (equivalent to) $2x$.

The pitch we use to define a scale, the frequency at which the scale repeats when doubled, is called the _tonic_. The quotient space
$$\mathbb{R}_{>0}/\sim, \quad \text{where } f \sim 2f,$$
is symmetrical and has no distinguished reference point until we choose a tonic. If we fix a particular tonic frequency $f_0$, we can define a single **octave** of that note as
$$\text{Octave}(f_0) = \{\, f \in \mathbb{R}_{>0} : f_0 \leq f < 2f_0 \,\}.$$
*In English: The set of octaves of a tonic with frequency $f_0$ is all positive real numbers greater than or equal to $f_0$ and strictly less than $2f_0$*.

This represents one complete cycle of pitch classes, starting from the tonic up to (but not including) its double. The set of all frequencies that belong to the *same pitch class* as the tonic $f_0$ (that is, the “same note” in any octave) is
$$\{\,2^n f_0 : n\in\mathbb{Z}\,\}.$$
If instead we want *every frequency in every octave band* relative to $f_0$ (partitioning all positive frequencies into successive octaves), we take the union of octave intervals:
$$
\bigcup_{n\in\mathbb{Z}} [\,2^n f_0,\ 2^{n+1}f_0\,)
\;=\;
\{\, f\in\mathbb{R}_{>0} : \exists n\in\mathbb{Z}\text{ such that }2^n f_0 \le f < 2^{n+1}f_0 \,\}.
$$
*In English: for each integer $n$, look at the interval from $2^n f_0$ up to (but not including) $2^{n+1}f_0$, then take the union over all $n$. This covers all positive frequencies, grouped into octave-wide bands.*


In a simple setting you can take the tonic’s frequency as the reference frequency $f_0$, similar to choosing a fundamental in acoustics. Other notes at particular ratios to the *tonic* also have special names:

![Music terminology table](/music_term_table.png)

# Octaves are circles!

The basis for differing notes being ratio and not increment also means that notes live on an exponential scale. So the lines on sheet music if measured by Hz would look very different indeed.
![log notes](/log_notes.png)

 In fact, we can write our mathematical definition of an octave using this scale by taking the logarithm base 2 of the frequency
$$\log_2: \mathbb{R}_{>0}\rightarrow \mathbb{R},\quad f\mapsto\log_2(f)$$
hence for the relation $f\sim 2f$ we get
$$
\begin{aligned}
\log_2(f)&\sim \log_2(2f)\\
\implies \log_2(f)&\sim \log_2(2)+ \log_2(f)\\
\implies \log_2(f)&\sim 1+ \log_2(f)\\
\implies\quad\quad\,\,  x&\sim x+1, \qquad \textit{where }x=\log_2(f)
\end{aligned}
$$
*In English: If a positive real is equivalent to its double, the log base 2 of a positive real is equivalent to the log base 2 of this positive real itself plus 1.*

The function $\log_2$ is bijective on $\mathbb{R}_{>0}$, that is it has a one-to-one mapping. This is really obvious if we look at the graph.

![Pitch log gragh](/pitch_log_graph.png)

Then we can map the whole space $\mathbb{R}_{>0}\rightarrow\mathbb{R}$ using our $\log_2$, then when we take the quotient we get
$$\mathbb{R}_{>0}/\sim\rightarrow \mathbb{R}/\sim^\ast$$
where $\sim^\ast$ is our transformed equivalence $x\sim^\ast x+1$, I'll just call it $\sim$ now. 

If we [think about it](https://antongomes.com/posts/just-stare), $\mathbb{R}/\sim$ is the set of reals where any value is equivalent to that value plus 1, which itself is equivalent to that value plus plus 1, i.e. plus 2 [^4]. So really what we have is any value in $\mathbb{R}/\sim$ is the same if it differs by an integer, which is exactly $\mathbb{R}/\mathbb{Z}$, the space of real numbers where all the integers are equivalent "glued together".

![Quotient mapping lines](/quotient_lines.png)

Now we might say "If all the integers are actually the same value, then why don't we draw them in the same point?", that is, what happens when we *glue* all the integers together?

![notes circle](/note_circle.png)

We get a circle! More precisely, consider the map
$$\phi:\mathbb{R}\to S^1,\qquad \phi(x)=e^{2\pi i x}.$$
Here $i$ is the imaginary unit with $i^2=-1$, and $e^{2\pi i x}$ is the complex number you get by walking around the unit circle by an angle of $2\pi x$ radians. Concretely,
$$e^{2\pi i x}=\cos(2\pi x)+i\sin(2\pi x),$$
so it always lands on the unit circle $S^1=\{z\in\mathbb{C}:|z|=1\}$ [^6]. 

Because adding an integer to $x$ adds a whole number of full turns,
$$e^{2\pi i (x+n)} = e^{2\pi i x}\quad \text{for all }n\in\mathbb{Z},$$
the map depends only on the equivalence class of $x$ modulo $\mathbb{Z}$. Therefore it descends to a well-defined bijection
$$\bar{\phi}:\mathbb{R}/\mathbb{Z}\ \longrightarrow\ S^1,$$
which is actually a (topological) group isomorphism. In short,
$$\mathbb{R}/\mathbb{Z}\cong S^1.$$
So if we are being really hand-wavey, the space of notes lives on a circle which we go round and round and round as we go p or down. 

Another intuitive space to map notes too is a helix rapping around a unit cylinder, in this the angle a point in the helix makes with the centre is the pitch and the heigh is the octave we are in, so when we go around the cylinder once we are one octave above where we started, but still on the same pitch. 

![note helix](/note_helix.png)

Formally we can write this mapping as 
$$x\mapsto (e^{2\pi i x}, x) \in S^1 \times \mathbb{R}$$

# Harmony and the lack-there-of

So if we have nicely ratio-ed frequencies then the scale sounds pleasant and "in tune", but what if we play lots of notes at the same time i.e. a chord? I know chords can sound good or they can sound bad, this is called *consonance* and *dissonance*, which is related to but not the same as the idea of *major* and *minor* chords sounds happy or sad. We're drifting into the worlds of physics and phycology here, more specifically Psychoacoustics:

> "**Psychoacoustics** is the branch of [psychophysics](https://en.wikipedia.org/wiki/Psychophysics "Psychophysics") involving the scientific study of the [perception](https://en.wikipedia.org/wiki/Perception "Perception") of [sound](https://en.wikipedia.org/wiki/Sound "Sound") by the human [auditory system](https://en.wikipedia.org/wiki/Auditory_system "Auditory system"). [^2]"

I know there are several concepts in mathematics that are referred to as _harmonic_, but the relationship of these to chords is not immediately obvious. There’s _simple harmonic motion_, which refers to oscillations with a sinusoidal waveform; that is, those that satisfy
$$\frac{d^2 x}{dt^2} + \omega^2 x = 0,$$

and have the general solution
$$x(t) = A\cos(\omega t + \phi),$$
where $A$ is the amplitude and $\phi$ the phase.

**Harmonic analysis** studies functions by decomposing them into basic oscillatory pieces, like sines and cosines. A classic example is a **Fourier series**, which expresses a periodic function as a (possibly infinite) sum of sinusoids [^3].

So if a sound is reasonably well-behaved, we can model it as built from sinusoidal components, each with its own frequency, amplitude, and phase. This does *not* mean the sound is “harmonic” in the musical sense, it just means sinusoids form a convenient mathematical basis for describing it.

Therefore, mathematical “harmony” (Fourier decomposition into oscillations) $\neq$ musical harmony (how notes and chords relate and how they feel).

**To be continued...**

[^1]: I know, I know, but I was not half bad, with performances in St George's Chapel and on stage at the [Hydro with Andrea Bucelli](https://www.heraldscotland.com/life_style/arts_ents/13133236.andrea-bocelli-sse-hydro-glasgow/) being just some of my career highlights. 

[^2]: https://en.wikipedia.org/wiki/Harmony

[^3]: https://mathworld.wolfram.com/Harmonic.html

[^4]: 1+1=2

[^5]: In fact its also true that $\mathbb{R}_{>0}/\sim\cong S^1$ under our original equivalence but to me this is slightly less intuitive.
[^6]: For those who are not familiar with this beauty i.e. Eurler's formula, to me it is one of those things in maths that is just true because of course it is. Of course you can prove it and should do at least once, but actually thinking about it too hard makes it more confusing. It's a fundamental truth, like  1 + 1 = 2 but in the complex plane, personally I do not live in the complex plane so this is not intuitive for me. Trying to break this down into why it is true every time is unnecessary work, accepting it as true and natural unlocks further understanding of concepts that rely on it. 
