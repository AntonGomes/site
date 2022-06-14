import Default from '../components/default'
import Link from 'next/link'
import styles from "../styles/cv.module.css"
import Emoji from 'a11y-react-emoji'

export default function cv() {


    return (
        <Default>

        <ul className={styles.nav}>
        <li><Link href="#intro">introduction</Link></li>
        <li><Link href="#skills">skills</Link></li>
        <li><Link href="#ed">education</Link></li>
        <li><Link href="#projects">projects</Link></li>
        </ul>

        <div className={styles.body}>

        <h3>Hey! I'm Anton. A 19 year old Scottish/Portuguese student at Edinburgh University and aspiring software engineer. 🏴󠁧󠁢󠁳󠁣󠁴󠁿🇵🇹</h3>
        <div id="intro">
         
        <h2>Introduction</h2>

        <p>I began programming two years ago, and after getting carried away with a school project, I let an obsession with the field come over me. </p>

        <p>This passion for programming not only influenced me to study Computing Science at the University of Edinburgh, but has now given me the drive to pursue a career as a software engineer.  </p>

        <p>I enjoy using my creativity to imagine and build original projects, in which, I let my attentiveness to detail, work ethic, and focus, assit me in reaching my objective. Said projects allow me to occupy all my spare time with practicing and improving my skills.</p>

        <p>I love the sense of achivement from attaining a goal. Whether it be picking up a new language, finishing a build, or once again coming to the realisation that there is <strong>always</strong> more to learn. </p>

        <p>Through coding, I have obtained the invaluable skill of self-teaching. I pride myself in my belief that my understanding of my learning style, and a knowledge of learning resources, allow me to solve almost any problem I am faced with. </p>
        <p>With this in mind, I present below <Link href="#projects">my favourite projects</Link> and <Link href="#skills">my current skill set</Link> (as well as a <Link href="#ed">record of my education</Link>).</p>
        </div>

        <div id="skills">
        <h2>Skills</h2>
        </div>

        <div id="ed">
        <h2>Education</h2>
        <h3>St Aloysius College (2006-21) </h3> 
        Six Highers and Three Advanced Highers at A grade, including Higher Italian and Advanced Higher Computing Science. 

        <h3>University of Edinburgh (2021-25)</h3>
        Computer Science and Mathematics BSc. 
        </div>

        <div id="projects">
        
        <h2>Projects</h2>

        <section id="site">
        <h3>antongomes.com </h3>

        I chose to build my personal site with ReactJs, particularly the Nextjs framework due to its popularity and ease of use. I have focused on functionality rather than a content-based website to improve my JavaScript skills. I use the site to share my projects with a wider user base. I have used a Python (flask) backend to store and manipulate Jsons for some guestbook and Bordle. 
        </section>

        <section id="bordle">
        <h3>bordle </h3>
        Bordle loads a random website from a list of URLs. Users can add to the list which is hosted on a Heroku server. I used the Python Flask framework which enhanced my Python skills and taught me the foundation of backend development. 
        </section>

        <section id="wordle">
        <h3>wordle CLI </h3>
        Inspired by the sudden rise of the web word game, my friend and I collaborated using GitHub to create a CLI version of the game. This project helped develop my proficiency with Python and taught me the importance of Git and GitHub for online collaboration. 
        </section>

        <section id="blog">
        <h3>markdown blog </h3>
        This was the first project I implemented on my personal site and so involved a fair amount of debugging and testing. This allowed me to gain insight on the importance of a well-formed test and certainly improved my debugging skills. This project helped me understand the importance of us 
        </section>

        <section id="speechify">
        <h3>speechify</h3>
        Speechify was my first real project. I began the script as a school project in Visual Basic, due to my inexpereince the code was not particuarly elegant at the time, but this gave me the chance to primarily refactor and optimise the project, and later translate it into Python where I finally ended up with something I could be proud of. the premise of Speechify is to read a literary text and through machine learnig concepts such as weighting and pserandom daat selection, "re-create" sentences that resemble those in the text, ut are not acctually included.
        </section>
        </div>
        </div>
        </Default>
    )
}
