import ReactMarkdown from 'react-markdown'
import {getPostSlugs, getPostBySlug} from '../../utils/postsAPI'
import Default from "../../components/default.jsx"
import styles from "../../styles/slug.module.css"

function Post(props) {
    return (
        <Default>
            <h1 className={styles.title}>{props.post.title || ""}</h1>
            <div className={styles.body}>
                <ReactMarkdown children={props.post.content}/>
            </div>
        </Default>
    )
}

export async function getStaticProps({params}) {
    console.log(params.slug)
    const post = await getPostBySlug(params.slug + ".md")
    return {props: {post: post}}
}

export async function getStaticPaths(){
    let slugs = getPostSlugs()
    console.log(slugs)
    return {
        paths: slugs.map(slug => '/posts/' + slug.replace('.md', '')),
        fallback: false,
    }
}
export default Post
