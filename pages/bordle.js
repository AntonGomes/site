import {useState, useEffect} from 'react' 
import Link from 'next/link'
import styles from '../styles/pages.module.css'


export default function bordle(props) {
    const [suggestion, setSuggestion] = useState("")
    const [urls, setUrls] = useState("")
    const [random, setRandom] = useState("")

    function getRandomInt(max) {
        const r = Math.floor(Math.random() * max)
        return r
    }   

    function getRandomLink() {
        let l = String(urls[getRandomInt(urls.length)])
        window.location.href

    }

    async function click() {
        const d = await fetch(`https://bordlebyanton.herokuapp.com/?url=${suggestion}`, {
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }).then(res => res.json()).then(data => {return data})

        setUrls(d.urls)

        return(d.urls)
    }

   useEffect(() => {
	   click()
	}, []);

    return(
        <div>
        <div className={styles.bordle}>
        <button onClick={getRandomLink}>Bored?</button>
        </div>
        <div className={styles.lessBoring}>
        Make bordle less boring:
        <input type="text"value={suggestion} onChange={(e) => setSuggestion(e.target.value)} />

        <button onClick={async () => await click()}>Submit</button>
        </div>
        </div>
    )
}

