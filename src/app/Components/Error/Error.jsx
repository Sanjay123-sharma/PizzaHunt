import React from 'react'
import Header from '../Header and Footer/Header'
import Footer from '../Header and Footer/Footer'
import { useNavigate } from 'react-router-dom'

export default function Error() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header /><br />
      <br />


      <div className="flex-1 flex items-center justify-center px-4 py-12 ml-20">
        <div className="text-center ">
          <img
            src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
            alt="404 Error"
            className="w-72 mx-auto mb-6 border-2 border-orange-400"
          />
          <h1 className="text-4xl font-bold text-gray-800 mb-2">404 - Page Not Found</h1>
          <p className="text-gray-500 mb-6">
            Oops! The page you're looking for doesn't exist.
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition"
          >
            Go to Home
          </button>
        </div>
      </div>

      <Footer />
    </div>
  )
}
