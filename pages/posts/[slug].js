import ReactMarkdown from 'react-markdown'
import {getPostSlugs, getPostBySlug} from '../../utils/postsAPI'
import Default from "../../components/default.jsx"
import styles from "../../styles/slug.module.css"
import remarkGfm from 'remark-gfm'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {dracula} from 'react-syntax-highlighter/dist/cjs/styles/prism'

function Post(props) {
    return (
        <Default>
        <h1 className={styles.title}>{props.post.title || ""}</h1>
        <div className={styles.body}>
        <ReactMarkdown 
            children={props.post.content} 
            remarkPlugins={[remarkGfm]}
            components={{
                code({node, inline, className, children, ...props}) {
                    const match = /language-(\w+)/.exec(className || '')
                    return !inline && match ? (
                        <SyntaxHighlighter
                        children={String(children).replace(/\n$/, '')}
                        style={dracula}
                        language={match[1]}
                        PreTag="div"
                        {...props}
                        />
                    ) : (
                        <code className={className} {...props}>
                        {children}
                        </code>
                    )
                }
            }}
        />
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
