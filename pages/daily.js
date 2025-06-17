import Link from "next/link"
import {useState} from 'react'
import {getAllDaily} from "../lib/dailyAPI"
import styles from "../styles/daily.module.css"
import Default from "../components/default.jsx"

export default function Dailys(props) {
    const posts = props.posts
    const [hide, setHide] = useState(true)
    
    let h = hide ? "none" : "block"

    return (
        <Default>
        <h1>Anton's Daily Blog</h1>
        <div className={styles.body}>
        I find that writing down what I'm doing while I'm doing it helps me to stay on track. Most of this is probably not very interesting but if you want to know what i'm up to day-to-day then read on. <br/><br/>
        The secondry motivation is of course for David Fincher to make a block buster bio-pic about my rise to world domination...

        <ul className={styles.postList}>
            {posts.map((post) => (
            <li key={post.slug}>
            <Link href={post.slug.replace(".md", "")}>
                <div className={styles.postBox}>
                <div className={styles.postDate}>{post.date}</div>
                <div className={styles.postContent}>{post.content.slice(0, 100)}</div>
                </div>
            </Link>
            </li>
        ))}
        </ul>

        </div>
        </Default>
    )
}

export async function getStaticProps() {
    const posts = getAllDaily()
    return {props: {posts: posts}}
}
