import { Analytics } from '@vercel/analytics/next';
import Link from 'next/link'
import {useEffect} from 'react'
import Helmet from 'react-helmet';


export default function Default(props) {
    useEffect(() => {
        document.documentElement.lang = 'en'
    });


   return (
            <div className="bg-stone-50 min-h-screen px-4 sm:px-6 lg:px-8 "> 
            <Helmet>
            <title>Anton's Site</title>
            <meta
                name="description"
                content="Anton Gomes' blog and personal site, discussing AI, maths, and anything else that I feel like."
            />
            </Helmet>
            
            <nav className="bg-stone-50">
              <div className="h-16 flex items-center px-4">
                <Link 
                  href="/" 
                  className="text-2xl hover:text-pink-500 transition-colors duration-200"
                >
                  🏠
                </Link>
              </div>
            </nav>
            
            <main>
              {props.children}
            </main>
            <Analytics />
            </div>
        )
    }
