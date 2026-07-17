import { neon } from '@neondatabase/serverless';
import Parser from 'rss-parser';

const sql = neon(process.env.DATABASE_URL);
const parser = new Parser();

export async function GET() {
  try {
    const feed = await parser.parseURL('https://www.fna.usda.gov/rss/policy-memos-child-nutrition-programs.xml');

    // Use a transaction or loop to insert/update data
    for (const item of feed.items) {
      await sql`
        INSERT INTO cn_news_feed (title, link, pub_date, content)
        VALUES (${item.title}, ${item.link}, ${item.isoDate}, ${item.contentSnippet})
        ON CONFLICT (link) DO NOTHING;
      `;
    }

    return Response.json({ message: 'Feed updated successfully' });
  } catch (error) {
    return Response.json({ error: 'Failed to fetch feed' }, { status: 500 });
  }
}
