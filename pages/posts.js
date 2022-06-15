import Link from "next/link"
import {useState} from 'react'
import {getAllPosts} from "../utils/postsAPI"
import styles from "../styles/posts.module.css"
import Default from "../components/default.jsx"

export default function Posts(props) {
    const posts = props.posts
    const [input, setInput] = useState("")
    const [hide, setHide] = useState(true)
    
    let filteredPosts = posts.filter(post => post.title.includes(input))

    let h = hide ? "none" : "block"

    return (
        <Default>
        <h1>Anton's Posts</h1>
        <div className={styles.body}>
        <div className={styles.input}>
            <input 
                type="search" 
                onChange={e => setInput(e.target.value)} 
                placeholder="search..."
        />
        </div>
            <ul>
            {
                filteredPosts.map(post => {
                    return (
                        <li>
                            <h1><Link href={post.slug.replace(".md", "")}>{post.title}</Link></h1>
                            <p>{post.description}</p>
                            <p>{post.date}</p>
                            <p>This post will take {post.readTime} seconds to read.</p>
                        </li>
                    )

                })
            }
            </ul>
        </div>
        </Default>
    )
}

export async function getStaticProps({params}) {
    const posts = await getAllPosts()
    return {props: {posts: posts}}
}
