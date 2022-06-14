import styles from '../styles/index.module.css'
import Link from 'next/link'
import Draggable from 'react-draggable';
import Default from "../components/default.jsx"

export default function Home() {
        
  return (
      <Default>
      <div className={styles.landing}>
      <div><Link href = "./bordle">bordle</Link></div>
      <div><Link href = "./draw">guest book</Link></div>
      <div><Link href = "./about">about</Link></div>
      <div className={styles.posts}><Link href = "./posts" >*posts in progress*</Link></div>
      </div>
      </Default>
  )
}
