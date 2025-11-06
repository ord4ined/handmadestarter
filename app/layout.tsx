export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'ui-sans-serif, system-ui', margin: 0 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: 16 }}>
          <header style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'12px 0' }}>
            <a href="/" style={{ textDecoration:'none', color:'inherit' }}><h1 style={{ margin:0 }}>Rare Handmade</h1></a>
            <nav><a href="/">Home</a></nav>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
