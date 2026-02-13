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
        <div className="bg-stone-50 min-h-screen py-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
              Anton's Site
            </h1>
            
            <div className="rounded-lg shadow-sm p-6 mb-8 max-w-3xl mx-auto text-gray-900 leading-relaxed">
              <p className="mb-4">
                Hello, my name is Anton and I care about AI, maths, and other things.
              </p>
              
              <p className="mb-4">
                I've been trying to write more. My qualifications are a degree in Computer Science + Maths from the University of Edinburgh and I have interned/worked with AI startups since 2022.
              </p>
              
              <div className="text-center mb-4">
                <Link 
                  href='/cv.pdf' 
                  className="text-gray-900 underline hover:text-pink-500 hover:no-underline transition-colors duration-200 font-medium"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  See my full CV.
                </Link>
              </div>

              <p className="mb-4">
                I love to make new connections, please reach out! You can find me on{' '}
                <a 
                  href="https://www.linkedin.com/in/anton-gomes" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-900 underline hover:text-pink-500 hover:no-underline transition-colors duration-200"
                >
                  LinkedIn
                </a>{' '}
                and{' '}
                <a 
                  href="https://github.com/AntonGomes" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-900 underline hover:text-pink-500 hover:no-underline transition-colors duration-200"
                >
                  GitHub
                </a>, or email me at <a href="mailto:aomlgomes@gmail.com" className="text-gray-900 underline hover:text-pink-500 hover:no-underline transition-colors duration-200">aomlgomes@gmail.com</a>. Currently looking for work in London, UK.
              </p>
            </div>

            <Posts posts={posts} />


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
