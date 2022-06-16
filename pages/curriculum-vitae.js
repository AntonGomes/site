import Default from '../components/default'
import Link from 'next/link'
import styles from "../styles/cv.module.css"
import Emoji from 'a11y-react-emoji'

export default function cv() {


    return (
        <Default>

        <h1>Anton's CV</h1>
        <div className={styles.cv}>
        <div className={styles.nav}>
        <h2><Link href="./curriculum-vitae">CV</Link></h2>
        <div><Link href="#intro">introduction</Link></div>
        <div><Link href="#skills">skills</Link></div>
        <div><Link href="#ed">education</Link></div>
        <div><Link href="#projects">projects</Link></div>
        </div>

        <div className={styles.body}>

        <b>Hey! I'm Anton. A 19 year old Scottish/Portuguese student at Edinburgh University and aspiring software engineer. 🏴󠁧󠁢󠁳󠁣󠁴󠁿🇵🇹</b>
        <div id="intro">
         
        <h2>Introduction</h2>

        <p>I was introduced to programming through a school project a few years ago. Now, after becoming increasing enthralled by the possibilities and power of coding, I've let an <i>obsession</i> with the field come over me. </p>

        <p>This passion for programming not only led me to study Computing Science at the University of Edinburgh, but has now given me the drive to pursue a career as a software developer.  </p>

        <p>In my spare time I use my creativity, attentiveness to detail, and focus to imagine and build original projects. I thrive on the sense of achivement these permit.</p>

        <p>I am resourceful and able to develop my skills independently. This comes from a knowledge of learning resources and an awareness of my learning practice, allowing me to solve any problems I encounter.</p>
        </div>


        <div id="skills">

        <h2>Skills</h2>


         
        <p><b>Programming Languages<br/> </b>I am adept in Javscript (with ReactJs), HTML, CSS, Java, and Python (including Flask). My experience in these languages comes from projects such as <a href="#bordle" > Bordle </a>(Python with Flask), my <a href="#blog" > Markdown blog</a> (ReactJs), a <a href = "#wordle"> Wordle CLI</a> (Python), and <a href="#speechify">Speechify</a> (Python).</p>

        <p><b>Teamwork (inlcuding Git and GitHub)<br/></b>Occasional collaberation on projects such as a <a href = "#wordle"> Wordle CLI</a>, has enhanced my communication skills and taught me the importace of version control and best practice.</p>

        <p><b>Responsibility & Pressure</b><br/>
        I enjoy working under pressure, and my experience in teamsports as a regional level player has developed ability to do so. <br/>
        My time as a junior club's coach taught me on how to handle responsibility, I beleive this to be one of my most vital skills. </p>

        <p><b>Organisation & Interpersonal Skills<br/></b>
        My occupation as a Service Advisor and Track and Trace Agent in the NHS signifiantly developed my interpersonal skills as the job required constant interaction with customers. I reguarly handled and navigated large data sets and constantly changing guidelines, thus improving my organisation skills.</p>

        </div>

        <div id="ed">

        <h2>Education</h2>

        <h4>St Aloysius College (2006-21) </h4> 
        Six Highers and Three Advanced Highers at A grade, including Higher Italian and Advanced Higher Computing Science. 

        <h4>University of Edinburgh (2021-25)</h4>
        Computer Science and Mathematics BSc. Courses completed so far include Functional Programming (Haskell), Computational Logic, and Object Oriented Programming (Java). 
        </div>

        <div id="projects">
        
        <h2>Projects</h2>

        <section id="site">
        <h3>antongomes.com </h3>

        <p>I chose to build my personal site with ReactJs, particularly the Nextjs framework owing to its popularity and ease of use. </p>
        <p>I have focused on functionality, rather than a content-based website, to improve my JavaScript abilities. </p>
        <p>I use the site to share my projects with a wider user base. I have used a Python (Flask) backend to store and manipulate JSONs for my <Link href="https://antongomes.com/draw">guest book</Link> and <Link href="#bordle">Bordle</Link>.</p> 
        </section>

        <section id="bordle">
        <h3>Bordle </h3>
        <p>The concept of Bordle is relatively simple, a button loads a random website from a list of user generated URLs. Users can append URLs to the list (hosted on my backend server) using the available input box.</p>
        <p>I used the Python Flask framework to reinforce my abilities with Python. This project also made me familiar with the process of backend development. </p>
        </section>

        <section id="wordle">
        <h3>Wordle CLI </h3>
        <p>Inspired by the sudden rise of the web word game, a friend and I collaborated using GitHub to bring Wordle to the terminal with a real time CLI version.</p>
        <p>This project, written in Python, not only taught me the importance of GitHub for online collaboration, but gave me and understanding of the associated workflow, some examples being: descriptive comments and commits, as well as best practices like readability.</p>
        </section>

        <section id="blog">
        <h3>Markdown blog </h3>
        This was the first project I implemented on my personal site and so involved a fair amount of debugging and testing. I came to understand the method for this process, with some of the practices I use today being formed during this time.
        </section>

        <section id="speechify">
        <h3>Speechify</h3>
        <p>Speechify reads a literary text and through machine learnig concepts such as weighting and pseudorandom data selection, "re-creates" sentences that resemble those in the text. </p>
        <p>I began the script as a school project using Visual Basic, but recently decided to revisit it. This gave me the opportunity to learn the process of <i>refactoring and optimisation.</i>  I also decided to translate the code to Python as I now use a Unix OS. </p>
        </section>
        </div>

        </div>
        </div>
        </Default>
    )
}
