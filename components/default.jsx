import styles from "../styles/default.module.css"
import Footer from "./footer.js"

export default function Default(props) {
    return (
        <div> 
            <div className={styles.body}>
                {props.children}
            </div>
            <Footer />
        </div>
    )
}

