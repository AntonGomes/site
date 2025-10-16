import ReactMarkdown from 'react-markdown'
import {getPostSlugs, getPostBySlug} from '../../lib/postsAPI'
import Default from "../../components/default.jsx"
import remarkGfm from 'remark-gfm'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {dracula} from 'react-syntax-highlighter/dist/cjs/styles/prism'

function Post(props) {
    return (
        <Default>
          <div className="bg-stone-50 min-h-screen px-4 sm:px-6 lg:px-8 py-8">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">{props.post.title || ""}</h1>
              <div className="bg-stone-50 rounded-lg shadow-sm p-6 sm:p-8">
                <ReactMarkdown 
                    children={props.post.content} 
                    remarkPlugins={[remarkGfm]}
                    className="prose prose-gray max-w-none"
                    components={{
                        img({node, ...props}) {
                            return <img {...props} className="border border-stone-300 rounded-md my-4 max-h-96 mx-auto" />
                        },
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
                                <code className="bg-gray-100 px-1 py-0.5 rounded text-sm" {...props}>
                                {children}
                                </code>
                            )
                        },
                        a({node, ...props}) {
                            return (
                                <a 
                                    {...props} 
                                    className="text-gray-900 underline hover:text-pink-500 hover:no-underline transition-colors duration-200"
                                />
                            )
                        },
                        h1({node, ...props}) {
                            return <h1 {...props} className="text-3xl font-bold text-gray-900 mb-4" />
                        },
                        h2({node, ...props}) {
                            return <h2 {...props} className="text-2xl font-bold text-gray-900 mb-3" />
                        },
                        h3({node, ...props}) {
                            return <h3 {...props} className="text-xl font-semibold text-gray-900 mb-2" />
                        },
                        p({node, ...props}) {
                            return <p {...props} className="text-gray-900 mb-4 leading-relaxed" />
                        },
                        ul({node, ...props}) {
                            return <ul {...props} className="list-disc list-inside text-gray-900 mb-4" />
                        },
                        ol({node, ...props}) {
                            return <ol {...props} className="list-decimal list-inside text-gray-900 mb-4" />
                        },
                        li({node, ...props}) {
                            return <li {...props} className="mb-1" />
                        },
                        blockquote({node, ...props}) {
                            return <blockquote {...props} className="border-l-4 border-gray-300 pl-4 italic text-gray-700 mb-4" />
                        }
                    }}
                />
              </div>
            </div>
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
    let slugs = await getPostSlugs()
    console.log("slugs", slugs)
    return {
        paths: slugs.map(slug => '/posts/' + slug.replace('.md', '')),
        fallback: false,
    }
}
export default Post
