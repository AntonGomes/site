import Link from "next/link"
import {useState} from 'react'
import styles from "../styles/posts.module.css"

export default function Posts(props) {
    const posts = props.posts
    const [input, setInput] = useState("")
    const [hide, setHide] = useState(true)
    
    let filteredPosts = posts.filter(post => post.title.includes(input))

    let h = hide ? "none" : "block"

    return (
        <div className={styles.postsContainer}>
            <h2>Recent Posts</h2>
            <ul className={styles.postsList}>
            {
                filteredPosts.map(post => {
                    return (
                        <li key={post.slug} className={styles.postItem}>
                            <h3 className={styles.postTitle}>
                                <Link href={post.slug.replace(".md", "")} className={styles.postLink}>
                                    {post.title}
                                </Link>
                            </h3>
                            <p className={styles.postDescription}>{post.description}</p>
                            <p className={styles.postDate}>{post.date}</p>
                        </li>
                    )

                })
            }
            </ul>
        </div>
    )
}

export async function getStaticProps({params}) {
    const posts = await getAllPosts()
    return {props: {posts: posts}}
}
