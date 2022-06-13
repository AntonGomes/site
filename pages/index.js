import styles from '../styles/pages.module.css'
import Link from 'next/link'
import Draggable from 'react-draggable';
import Default from "../components/default.jsx"

export default function Home() {
        
  return (
      <Default>
      <div className={styles.landing}>
      <Link href = "./bordle">bordle</Link>
      <Link href = "./draw">guest book</Link>
      <Link href = "./about">about</Link>
      <Link href = "./posts">*posts in progress*</Link>
      </div>
      </Default>
  )
}
