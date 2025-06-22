import styles from '../styles/index.module.css'
import Link from 'next/link'
import Footer from "../components/footer.js"

export default function Home() {
        
  return (
      <div>
      <div className={styles.body}>
      <h1>Anton's Site</h1>
      <div className={styles.landing}>
        Hello, my name is Anton and I care about AI, maths, and their intersection in ethical and socially benifitial applications. <br/><br/>

        I sometimes like to write and have spent way too much time learning how to focus. <br/><br/>

        I love to talk and make connections so please reach out!  </div>
        <ul>
          <li><Link href = "./posts">blog</Link></li>
          <li><Link href = "./daily">daily blog</Link></li>
          <li><Link href = "./cv">CV</Link></li>
        </ul>
      </div>
      <Footer />
      </div>
  )
}
