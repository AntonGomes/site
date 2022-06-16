import styles from '../styles/index.module.css'
import Link from 'next/link'
import Draggable from 'react-draggable';
import Footer from "../components/footer.js"

export default function Home() {
        
  return (
      <div>
      <div className={styles.body}>
      <h1>Anton's Site</h1>
      <div className={styles.landing}>
      <Link href = "./posts">posts</Link>
      <Link href = "./bordle">bordle</Link>
      <Link href = "./draw">guest book</Link>
      <Link href = "./about">about</Link>
      <Link href = "./curriculum-vitae">CV</Link>
      </div>
      </div>
      <Footer />
      </div>
  )
}
