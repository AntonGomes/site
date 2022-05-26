import styles from '../styles/pages.module.css'
import Link from 'next/link'
import Draggable from 'react-draggable';
import { useRef } from 'react';

export default function Home() {
        
  return (
      <div className={styles.landing}>
           <Draggable>
      <div><Link href = "./bordle">bordle</Link></div>
            </Draggable>
            <Draggable>
      <div><Link href = "./draw">guest book</Link></div>
            </Draggable>
            <Draggable>
      <div><Link href = "./about">about</Link></div>
            </Draggable>
             <Draggable>
      <div><Link href = "./posts">*posts coming soon*</Link></div>
            </Draggable>
            
      </div>
  )
}
