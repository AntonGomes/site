import styles from '../styles/pages.module.css'
import Link from 'next/link'
import Draggable from 'react-draggable';
import { useRef } from 'react';

export default function Home() {
        
  const mover = useRef({
                    position: 'absolute',
                    top: Math.floor(Math.random()*1000),
                    left: Math.floor(Math.random()*1000),
                    transform: 'translate(-50%, -50%)'
              });
  const mover_2 = useRef({
                    position: 'absolute',
                    top: Math.floor(Math.random()*1000),
                    left: Math.floor(Math.random()*1000),
                    transform: 'translate(-50%, -50%)'
              });
  const mover_3 = useRef({
                    position: 'absolute',
                    top: Math.floor(Math.random()*1000),
                    left: Math.floor(Math.random()*1000),
                    transform: 'translate(-50%, -50%)'
              });
  const mover_4 = useRef({
                    position: 'absolute',
                    top: Math.floor(Math.random()*1000),
                    left: Math.floor(Math.random()*1000),
                    transform: 'translate(-50%, -50%)'
              });
  return (
      <div className={styles.body}>
            <Draggable>
      <div style={mover.current}><Link href = "./posts">Posts</Link></div>
            </Draggable>
            <Draggable>
      <div style={mover_2.current}><Link href = "./bordle">Bordle</Link></div>
            </Draggable>
            <Draggable>
      <div style={mover_3.current}><Link href = "./about">About</Link></div>
            </Draggable>
            <Draggable>
      <div style={mover_4.current}><Link href = "./draw">Sign the guest book!</Link></div>
            </Draggable>
      </div>
  )
}
