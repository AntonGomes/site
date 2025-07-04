import matter from 'gray-matter';
import fs from 'fs';
import {join} from 'path';

export function getPostSlugs() {
    return fs.readdirSync('./src/posts')
}

export function getPostBySlug(slug) {
    const path = join(process.cwd(), '/src/posts/' + slug)
    const fileContent = fs.readFileSync(path, 'utf8')
    const meta = matter(fileContent)
    const post = meta.data
    const content = meta.content
    return { 
        title: post.title,
        description: post.description,
        date: post.date,
        readTime: post.readTime,
        content: content,
        slug: '/posts/' + slug,
    }
}

export async function getAllPosts() {
    const slugs = getPostSlugs()
    const posts = slugs.map(post => {
        const p = getPostBySlug(post)
        return p
    })
    return posts
}
