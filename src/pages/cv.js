import Default from "../components/default.jsx"
import Link from "next/link"

export default function CVViewer() {
  return (
    <Default>
      <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
        <h1>CV</h1>
        {/* center this link */}
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Link href='/cv.pdf' target="_blank" rel="noopener noreferrer" style={{ 
            color: '#0070f3', 
            textDecoration: 'none',
            fontSize: '18px',
            fontWeight: '500'
          }}>
            See my full CV.
          </Link>
        </div>
      </div>
    </Default>
  );
}