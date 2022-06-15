import styles from '../styles/index.module.css'
import Link from 'next/link'
import Draggable from 'react-draggable';
import Default from "../components/default.jsx"

export default function Home() {
        
  return (
      <Default>
      <div className={styles.landing}>
      <Link href = "./posts">posts</Link>
      <Link href = "./bordle">bordle</Link>
      <Link href = "./draw">guest book</Link>
      <Link href = "./about">about</Link>
      <Link href = "./curriculum-vitae">curriculum-vitae</Link>
      </div>
      </Default>
  )
}
