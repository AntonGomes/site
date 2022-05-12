import CanvasDraw from "react-canvas-draw";
import {useState} from 'react' 
import styles from '../styles/pages.module.css'

export default function Draw() {
    const {content, getContent} = useState();
    return (
        <div className={styles.canvas}>
        <h1>Be My Guest :)</h1>
        <CanvasDraw 
            canvasWidth={1000}
            canvasHeight={1000}
            brushRadius={3}
            brushColor= {"black"}
            hideGrid= {true}
            lazyRadius= {0}
        />
        </div>
    ) 
}
