import Link from "next/link"

export default function Posts(props) {
    const posts = props.posts
    
    return (
        <div className="mb-8 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">Recent Posts</h2>
            <div className="space-y-4">
            {
                posts.map(post => {
                    return (
                        <div key={post.slug} className="bg-stone-50 rounded-lg shadow-sm p-6 border border-stone-300 hover:shadow-md transition-shadow duration-200">
                            <h3 className="text-xl font-semibold mb-2">
                                <Link 
                                    href={`${post.slug.replace(".md", "")}`} 
                                    className="text-gray-900 underline hover:text-pink-500 hover:no-underline transition-colors duration-200"
                                >
                                    {post.title}
                                </Link>
                            </h3>
                            <p className="text-gray-700 mb-2">{post.description}</p>
                            <p className="text-sm text-gray-500">{post.date}</p>
                        </div>
                    )
                })
            }
            </div>
        </div>
    )
}

export async function getStaticProps({params}) {
    const posts = await getAllPosts()
    return {props: {posts: posts}}
}
