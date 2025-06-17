import styles from '../styles/about.module.css'
import Default from "../components/default.jsx"

export default function About(props) {
    return (
        <Default>
        <div className={styles.about}>
        <h1> Hello</h1>
        <p>My name is Anton, I <a href='https://github.com/AntonGomes'>code</a> and am a <a href='/blog/gen_top_drawings'>maths</a>
        fan.</p> 
        <p>
        
        </p>
    </div>
        </Default>
    )
}

