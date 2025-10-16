import Default from "../components/default.jsx"
import Link from "next/link"

export default function CVViewer() {
  return (
    <Default>
      <div className="bg-gray-50 min-h-screen px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">CV</h1>
          <div className="bg-white rounded-lg shadow-sm p-8 max-w-2xl mx-auto text-center">
            <Link 
              href='/cv.pdf' 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-lg font-medium text-gray-900 underline hover:text-pink-500 hover:no-underline transition-colors duration-200"
            >
              See my full CV.
            </Link>
          </div>
        </div>
      </div>
    </Default>
  );
}