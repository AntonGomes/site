import ReactMarkdown from 'react-markdown'
import {getPostSlugs, getPostBySlug} from '../../utils/postsAPI'

function Post(props) {
    return (
        <div>
            <div>{props.post.title || ""}</div>
            <div>
                <ReactMarkdown children={props.post.content}/>
            </div>
        </div>
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
