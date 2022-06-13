import Default from '../components/default'
import Link from 'next/link'
import styles from "../styles/cv.module.css"

export default function Cv() {
    return (
        <Default>

        <ul className={styles.nav}>
        <li><a href="#intro">introduction</a></li>
        <li><a href="#skills">skills</a></li>
        <li><a href="#ed">education</a></li>
        <li><a href="#projects">projects</a></li>
        </ul>

        <div className={styles.body}>

            <div id="intro">
            Having begun programming two years ago after getting carried away with a school project I have since fallen in love with the field. I enjoy using my creativity to create original projects in my spare time. My attentiveness to detail and work ethic are just some of the traits which I believe carry my abilities as a programmer. Through coding, I have obtained the invaluable skill of self-teaching. I pride myself my beleif that while at present a task may unattainable, I can use an understanding of my learning style and a knowledge of learning resources to solve any problems I am faced with.
            </div>

            <div>
            <table id="skills"><tbody>
                <tr>
                    <th>Skill</th><th>Experience Level</th><th>Related Work</th>
                </tr>  
                <tr>
                    <td>JavaScript</td><td>Competent</td><td></td>
                </tr>  
                <tr>
                    <td>HTML & CSS</td><td>Competent</td><td></td>
                </tr>  
                <tr>
                    <td>Python</td><td>Competent</td><td><ul><li><a href="#bordle">Bordle (Flask backend)</a></li><li><a href="https://github.com/AntonGomes/wordle">Wordle CLI</a></li></ul></td>
                </tr>  
                <tr>
                    <td>Visual Basic</td><td>Competent</td><td></td>
                </tr>  
                <tr>
                    <td>Git and GitHub</td><td>Competent</td><td></td>
                </tr>  
                <tr>
                    <td>Linux</td><td>Competent</td><td></td>
                </tr>  
            </tbody></table>
            </div>

            <div id="ed">
				<h4>St Aloysius College (2006-21) </h4> 
				Six Highers and Three Advanced Highers at A grade, including Higher Italian and Advanced Higher Computing Science. 

				<h4>University of Edinburgh (2021-25)</h4>
				Computer Science and Mathematics BSc. 
					</div>

            <div id="projects">

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
