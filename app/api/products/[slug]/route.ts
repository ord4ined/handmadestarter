import { NextRequest, NextResponse } from 'next/server';
import { pool } from '../../db';

export async function GET(req: NextRequest, { params }: any) {
  const slug = params.slug;
  const { rows } = await pool.query(
    `select p.*, coalesce(s.review_count,0) as review_count, coalesce(s.avg_rating,0) as avg_rating
     from products p
     left join product_rating_summary s on s.product_id = p.id
     where p.seo_slug=$1`, [slug]);
  if (!rows[0]) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  const product = rows[0];
  const media = await pool.query('select * from product_media where product_id=$1 order by sort asc', [product.id]);
  const price = await pool.query('select list_price, currency from prices where product_id=$1 order by effective_from desc limit 1', [product.id]);
  return NextResponse.json({ product, media: media.rows, price: price.rows[0] });
}
