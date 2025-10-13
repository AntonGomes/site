import matter from 'gray-matter';
import {join} from 'path';
import { promises as fs } from 'fs';

export async function getPostSlugs() {
    return fs.readdir('./src/posts')
}

export async function getPostBySlug(slug) {
    const path = join(process.cwd(), '/src/posts/' + slug)
    console.log("path", path )
    const fileContent = await fs.readFile(path, 'utf8')
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
    const slugs = await getPostSlugs()
    const posts = await Promise.all(slugs.map(async post => {
        const p = await getPostBySlug(post)
        return p
    }))
    return posts
}
