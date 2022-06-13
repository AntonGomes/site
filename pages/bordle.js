import styles from '../styles/bordle.module.css'
import Default from "../components/default.jsx"
import {useState, useEffect} from 'react' 
import Link from 'next/link'


export default function bordle(props) {
    const [suggestion, setSuggestion] = useState("")
    const [urls, setUrls] = useState("")
    const [random, setRandom] = useState("")

    function getRandomInt(max) {
        const r = Math.floor(Math.random() * max)
        return  r
    }   

    function getRandomLink() {
        window.open(String(urls[getRandomInt(urls.length)]), '_blank', 'noopener,noreferrer')
 
    }

    async function click() {
       if (!(suggestion.startsWith("https://") || suggestion.startsWith("http://"))) {
            alert("invalid url buddy -_-")
            return;
        }
        alert("site has been bordled")
        const d = await fetch(`https://bordlebyanton.herokuapp.com/setUrls?url=${suggestion}`, {
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }).then(res => res.json()).then(data => {return data})

        setUrls(d.urls)
    }

    useEffect(() => {
        (async () => {
            let d = await fetch("https://bordlebyanton.herokuapp.com", {
                mode: "cors",
                headers: {
                    'Content-Type': 'application/json',
                }
             }).then(res => res.json()).then(data => {return data})
            setUrls(d.urls)
        })()
    })

    return(
        <Default>
        <button className={styles.bordle} onClick={getRandomLink}>Bored?</button>
        <div className={styles.lessBoring}>
        Make bordle less boring:
        <input 
			type="text"
            value={suggestion} 
            onChange={(e) => setSuggestion(e.target.value)} 
            placeholder="https://antongomes.com/draw"
		/>

        <button onClick={async () => await click()}>Submit</button>
        </div>
        </Default>
    )
}

