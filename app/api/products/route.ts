import { NextResponse } from 'next/server';
import { pool } from '../../db';

export async function GET() {
  const { rows } = await pool.query(`
    select p.id, p.title, p.description, p.seo_slug,
           (select url from product_media m where m.product_id=p.id order by sort asc limit 1) as image,
           (select list_price from prices pr where pr.product_id=p.id order by effective_from desc limit 1) as price
    from products p where status='published' order by created_at desc limit 50
  `);
  return NextResponse.json(rows);
}
