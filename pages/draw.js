import styles from '../styles/draw.module.css'
import Default from "../components/default"
import CanvasDraw from "react-canvas-draw";
import {useState, useRef, useEffect} from 'react' 

export default function Draw(props) {
	const canvas = useRef([]);

    async function click() {
        alert("Thanks for coming!")
        const saveData = canvas.current.getSaveData() //temp variable to store save data
        const d = await fetch(`https://bordlebyanton.herokuapp.com/setDraw`, {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                body: (saveData), //update json with saveData
                })
    }
    
    return (
        <Default>
        <h1>Anton's Guest Book</h1>

        <div className={styles.text}>
        
        <p>Leave a message below to if your dropping by! </p>
        <p>P.S. Remember, any saved drawings will remain on the site unless removed by admin. So please keep things PG, my mum checks this site!</p>

        <CanvasDraw 
            ref={canvas}
            canvasWidth={360}
            canvasHeight={500}
            brushRadius={1}
            brushColor= {"black"}
            hideGrid= {true}
            lazyRadius= {0}
            loadTimeOffset={10}
            className={styles.draw}
        />
        
        <button className={styles.button} onClick={async () => await click()}>
        save
		</button>
        <button className={styles.button} onClick={() => {canvas.current.undo()}}>
	    undo
		</button>


        </div>
        </Default>
    ) 
}


