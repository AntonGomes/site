import styles from '../styles/index.module.css'
import Posts from "../components/posts.js"
import { getAllPosts } from "../lib/postsAPI.js"
import Default from "../components/default.jsx"
import Link from 'next/link'

import { useState } from "react";

export default function Home({ posts }) {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      console.log(JSON.stringify(formData));

      if (res.ok) setStatus("Message sent!");
      else setStatus("Failed to send message.");
    } catch (err) {
      setStatus("Error sending message.");
    }
  };

   

        
  return (
      <Default>
        <div className={styles.body}>
            <div className={styles.landing}>
              Hello, my name is Anton and I care about AI, maths, and other things. <br/><br/>

              I've been trying to write more. My qualifications are a degree in Computer Science + Maths from the University of Edinburgh and have interned/worked with AI startups since 2022. <br/><br/>
              
              <Link href='/cv.pdf' className={styles.cv}>See my full CV.</Link> <br/><br/>

              I love to make new connections, please reach out! You can find me on <a href = "https://www.linkedin.com/in/anton-gomes" target="_blank">LinkedIn</a> and <a href = "https://github.com/AntonGomes" target="_blank">GitHub</a>, or use the contact form below. Currently looking for work in London, UK.
   
            </div>
         <Posts posts={posts} />


            <div className={styles.contactSection}>
              <form onSubmit={handleSubmit} className={styles.contactForm}>
                <h2 className={styles.formTitle}>Reach out</h2>
                
                <div className={styles.inputGroup}>
                  <label htmlFor="name" className={styles.label}>Name</label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    className={styles.input}
                    required
                  />
                </div>
                
                <div className={styles.inputGroup}>
                  <label htmlFor="email" className={styles.label}>Email</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Your email"
                    value={formData.email}
                    onChange={handleChange}
                    className={styles.input}
                    required
                  />
                </div>
                
                <div className={styles.inputGroup}>
                  <label htmlFor="message" className={styles.label}>Message</label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Your message"
                    value={formData.message}
                    onChange={handleChange}
                    className={styles.textarea}
                    required
                  />
                </div>
                
                <button 
                  type="submit" 
                  className={styles.submitButton}
                >
                  Send Message
                </button>
                
                {status && (
                  <div className={`${styles.statusMessage} ${styles[status.replace(/\s+/g, '').toLowerCase()]}`}>
                    {status}
                  </div>
                )}
              </form>
            </div>
        </div>
      </Default>
  )
}

export async function getStaticProps() {
  const posts = await getAllPosts();
  return {
    props: { posts }
  };
}
