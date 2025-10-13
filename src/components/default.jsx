import styles from "../styles/default.module.css"
import Link from 'next/link'
import {useEffect} from 'react'
import Helmet from 'react-helmet';


export default function Default(props) {
    useEffect(() => {
        document.documentElement.lang = 'en'
    });


   return (
            <div> 
            <Helmet>
            <title>Anton's Site</title>
            <meta
                name="description"
                content="Anton Gomes' blog and personal site, discussing AI, maths, and anything else that I feel like."
            />
            </Helmet>
            
            <h2 className={styles.head}>
            <Link href="/" >🏠</Link>
            </h2>
       
            <h1 className="">Anton's Site</h1>
            <div className={styles.body}>
            {props.children}
            </div>
            </div>
        )
    }
