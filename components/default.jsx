import styles from "../styles/default.module.css"
import Footer from "./footer.js"
import Link from 'next/link'

export default function Default(props) {
    return (
        <div> 
        <title>Anton's Site</title>
        <div className={styles.head}><Link href="./">Anton's Site</Link></div>
            <div className={styles.body}>
                {props.children}
            </div>
            <Footer />
        </div>
    )
}

