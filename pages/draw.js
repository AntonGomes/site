import styles from '../styles/draw.module.css'
import Default from "../components/default"
import CanvasDraw from "react-canvas-draw";
import {useState, useRef, useEffect} from 'react' 

export default function Draw(props) {
	const canvas = useRef(null);

    async function click() {
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

    useEffect(() => { //get drawing on deployment
        (async () => {
            const d = await fetch('https://bordlebyanton.herokuapp.com/getDraw', {
                    mode: "cors",
                    headers: {
                        'Content-Type': 'application/json',
                    }
                 }).then(res => res.json()).then(data => {return data})
                const saveData = JSON.stringify(d.draw)
                canvas.current.loadSaveData(saveData)
                console.log(saveData)
        })()
    })


    return (
        <Default>

        <h1 className={styles.head}>Be My Guest :)</h1>

        <button className={styles.button} onClick={() => {canvas.current.undo()}}>
			save
		</button>
        <button className={styles.button} onClick={async () => await click()}>
        undo
        </button>

        <p>P.S. once you sign below (and click save), your signature will remain on the guest book unless removed by admin. </p>
        <p>P.P.S. Please keep things PG my mum checks this site ;)</p>

        <CanvasDraw 
            ref={canvas}
            canvasWidth={1000}
            canvasHeight={1000}
            brushRadius={1}
            brushColor= {"black"}
            hideGrid= {true}
            lazyRadius= {0}
            loadTimeOffset={10}
        />

        </Default>
    ) 
}


