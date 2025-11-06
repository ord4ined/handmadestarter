'use client';
import useSWR from 'swr';
import { useState } from 'react';

const fetcher = (url:string) => fetch(url).then(r=>r.json());

export default function ProductPage({ params }: any) {
  const API_BASE = '';
  const { data } = useSWR(`/api/products/${params.slug}`, fetcher);
  const [form, setForm] = useState({ rating: 5, title: '', body: '' });
  const [msg, setMsg] = useState('');

  if (!data) return <p>Loading…</p>;
  const { product, media, price } = data;

  async function submitReview() {
    const res = await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productId: product.id,
        rating: Number(form.rating),
        title: form.title,
        body: form.body
      })
    });
    const out = await res.json();
    setMsg(out.message || 'Submitted');
  }

  return (
    <main>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:24 }}>
        <div>{media?.[0]?.url && <img src={media[0].url} alt={media[0].alt_text||product.title} style={{ width:'100%', borderRadius:12 }} />}</div>
        <div>
          <h1>{product.title}</h1>
          <p style={{ opacity:.7 }}>Avg rating: {product.avg_rating ?? 0} ({product.review_count ?? 0} reviews)</p>
          {price && <h3>PKR {price.list_price}</h3>}
          <p>{product.description}</p>
          <hr/>
          <h3>Leave a review</h3>
          <div style={{ display:'grid', gap:8, maxWidth:420 }}>
            <label>Rating
              <select value={form.rating} onChange={e=>setForm({ ...form, rating: Number(e.target.value) })}>
                {[5,4,3,2,1].map(n=><option key={n} value={n}>{n}</option>)}
              </select>
            </label>
            <input placeholder="Title" value={form.title} onChange={e=>setForm({ ...form, title: e.target.value })} />
            <textarea placeholder="Your review" value={form.body} onChange={e=>setForm({ ...form, body: e.target.value })} />
            <button onClick={submitReview}>Submit for approval</button>
            {msg && <p>{msg}</p>}
          </div>
          <hr/>
          <Reviews productId={product.id} />
        </div>
      </div>
    </main>
  );
}

function Reviews({ productId }: any) {
  const { data } = useSWR(`/api/reviews/${productId}`, fetcher);
  if (!data) return <p>Loading reviews…</p>;
  if (data.length === 0) return <p>No reviews yet.</p>;
  return (
    <div>
      <h3>Reviews</h3>
      {data.map((r:any) => (
        <div key={r.id} style={{ borderTop:'1px solid #eee', paddingTop:8, marginTop:8 }}>
          <strong>{'★'.repeat(r.rating)}</strong>
          {r.title && <div>{r.title}</div>}
          {r.body && <p>{r.body}</p>}
        </div>
      ))}
    </div>
  );
}
