import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const dailyDir = path.join(process.cwd(), 'daily');

export function getDailySlugs() {
  return fs.readdirSync(dailyDir);
}

export function getDailyBySlug(slug) {
  const fullPath = path.join(dailyDir, slug);
  const fileContent = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContent);

  return {
    date: data.date,
    content,
    slug: '/daily/' + slug,
  };
}

export function getAllDaily() {
  const slugs = getDailySlugs();
  return slugs.map(getDailyBySlug);
}