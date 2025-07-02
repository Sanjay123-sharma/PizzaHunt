import React from 'react'
import Header from '../Header and Footer/Header'
import Footer from '../Header and Footer/Footer'

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header /><br /><br />

      <main className="flex-1 max-w-6xl mx-auto px-4 py-12 ml">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center text-orange-400">About Us</h1>

        <section className="mb-10 text-center">
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Welcome to <span className="text-orange-500 font-semibold">Tony Pizza</span> —
            where flavor meets passion! We serve freshly baked, handcrafted pizzas
            made with the finest ingredients. Our goal is to deliver not just food,
            but a slice of happiness with every order.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <img
            src="https://img.freepik.com/free-photo/top-view-pizza_23-2147772174.jpg"
            alt="About Pizza"
            className="rounded-xl shadow-lg"
          />
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Story</h2>
            <p className="text-gray-600 leading-relaxed">
              What started as a small neighborhood pizzeria has grown into a beloved
              local brand. Every pizza is a labor of love — from hand-tossed dough to
              signature sauces. We believe in quality, creativity, and community.
            </p>
          </div>
        </section>

        <section className="mt-16 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Why Choose Us?</h2>
          <ul className="text-gray-600 space-y-2">
            <li>✅ Fresh & high-quality ingredients</li>
            <li>✅ Wide variety: Veg, Non-Veg & Speciality</li>
            <li>✅ Quick delivery & easy online ordering</li>
            <li>✅ Customer-first approach</li>
          </ul>
        </section>
      </main>

      <Footer />
    </div>
  )
}
