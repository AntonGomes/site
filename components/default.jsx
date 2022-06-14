import styles from "../styles/default.module.css"
import Footer from "./footer.js"
import Link from 'next/link'
import {useEffect} from 'react'

export default function Default(props) {
	useEffect(() => {
        document.documentElement.lang = 'en'
    });
	return (
		<div> 
		<title>Anton's Site</title>
		<meta name="description" content="Anton Gomes' portfolio site. Includes tutorials, writings and spare-time projects (inlcuding Bordle - The Cure for Boredom)." />
		<h1 className={styles.head}><Link href="./">Anton's Site</Link></h1>
		<div className={styles.body}>
		{props.children}
		</div>
		<Footer />
		</div>
	)
}
