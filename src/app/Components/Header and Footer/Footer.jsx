import React from 'react';
import { NavLink } from 'react-router';

export default function Footer() {
  return (
    <footer className="bg-[#0f172a] text-gray-300 px-6 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
       
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <img
              src="https://img.icons8.com/pin/100/pizza.png"
              alt="Pizza Icon"
              className="w-5 h-5"
            />
            <h2 className="font-bold text-lg text-orange-500">PizzaHunt</h2>
          </div>
          <p className="text-sm">
            Serving the best pizzas in town since 1985. Fresh ingredients,
            authentic recipes, and fast delivery.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1">
            <li><NavLink to="/" className="hover:text-white">Home</NavLink></li>
            <li><NavLink to="/contact" className="hover:text-white">Contact Us</NavLink></li>
            <li><NavLink to="/orders" className="hover:text-white">Orders</NavLink></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-white font-semibold mb-2">Contact Info</h3>
          <ul className="space-y-1 text-sm">
            <li className="flex items-center space-x-2">
              
              <span>(555) 123-PIZZA</span>
            </li>
            <li className="flex items-center space-x-2">
              
              <span>info@tonyspizza.com</span>
            </li>
            <li className="flex items-center space-x-2">
             
              <span>123 Pizza Street, Food City</span>
            </li>
          </ul>
        </div>

        {/* Hours */}
        <div>
          <h3 className="text-white font-semibold mb-2">Hours</h3>
          <ul className="text-sm space-y-1">
            <li>Mon–Thu: 11AM – 10PM</li>
            <li>Fri–Sat: 11AM – 11PM</li>
            <li>Sunday: 12PM – 9PM</li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} PizzaHunt. All rights reserved.
      </div>
    </footer>
  );
}
