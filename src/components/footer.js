import styles from "../styles/footer.module.css"
import Link from 'next/link'

export default function Footer(props) {
    return (
        <div className={styles.footer}>

        <div className={styles.info}>
        <ul>
            <li className={styles.head}><Link href="./">antongomes</Link></li>
            <li>edinburgh, united kingdom</li>
            <li>tel: +44 7584 428912</li>
            <li><a href = "mailto:anton@antongomes.com">anton@antongomes.com</a></li>  
        </ul>

        <ul className={styles.contacts}>
            <li><a href = "https://github.com/AntonGomes" target="_blank">💻</a></li>
            <li><a href = "https://twitter.com/AomlGomes" target="_blank">🐣</a></li>  
            <li><a href = "https://www.linkedin.com/in/anton-gomes-377a97233/" target="_blank">🤝</a></li>
        </ul>
        </div>

        <div className={styles.pages}>
        <ul> 
            <li><a href = "./">home</a></li>
            <li><a href = "./posts">posts</a></li>
            <li><a href = "./posts">daily blog</a></li>
            <li><a href = "./cv">CV</a></li>
        </ul>
        </div>
        </div>
    )
}


