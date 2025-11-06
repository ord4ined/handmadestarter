import Link from 'next/link';

async function getProducts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || ''}/api/products`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

export default async function HomePage() {
  const products = await getProducts();
  return (
    <main>
      <h2>New Arrivals</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {products.map((p:any) => (
          <Link key={p.id} href={`/products/${p.seo_slug}`} style={{ textDecoration:'none', color:'inherit' }}>
            <div style={{ border:'1px solid #eee', padding:12, borderRadius:12 }}>
              {p.image && <img src={p.image} alt={p.title} style={{ width:'100%', borderRadius:8 }} />}
              <div style={{ display:'flex', justifyContent:'space-between', marginTop:8 }}>
                <strong>{p.title}</strong>
                <span>{p.price ? `PKR ${p.price}` : ''}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
