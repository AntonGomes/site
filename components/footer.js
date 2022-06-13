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
            <li><a href = "mailto:anton@antongomes.com">email: anton@antongomes.com</a></li>  
        </ul>

        <ul className={styles.contacts}>
            <li><a href = "https://github.com/AntonGomes">github</a></li>
            <li><a href = "https://twitter.com/AomlGomes">twitter</a></li>  
            <li><a href = "https://linkedin.com">linkedin</a></li>
        </ul>
        </div>

        <ul className={styles.pages}> 
            <li><a href = "./">home</a></li>
            <li><a href = "./about">about</a></li>
            <li><a href = "./draw">guest book</a></li>
            <li><a href = "./bordle">bordle</a></li>
            <li><a href = "./posts">*posts coming soon*</a></li>
        </ul>
        </div>
    )
}


