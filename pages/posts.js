import Link from "next/link"
import {useState} from 'react'
import {getAllPosts} from "../utils/postsAPI"

export default function Posts(props) {
    const posts = props.posts
    const [input, setInput] = useState("")
    const [hide, setHide] = useState(true)
    
    let filteredPosts = posts.filter(post => post.title.includes(input))

    let h = hide ? "none" : "block"

    return (
        <div>
        <div>
            <input value="search" type="search" onChange={e => setInput(e.target.value)} />
        </div>
        <div>
            <ul>
            {
                filteredPosts.map(post => {
                    return (
                        <li>
                            <div>
                                <h2><Link href={post.slug.replace(".md", "")}>{post.title}</Link></h2>
                                <p>{post.date}</p>
                                <p>This post will take {post.readTime} seconds to read</p>
                                <p>{post.description}</p>
                            </div>
                        </li>
                    )

                })
            }
            </ul>
        </div>
        </div>
    )
}

export async function getStaticProps({params}) {
    const posts = await getAllPosts()
    return {props: {posts: posts}}
}
