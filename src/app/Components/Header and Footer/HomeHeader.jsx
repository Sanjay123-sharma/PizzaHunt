import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

export default function HomeHeader({ search, setSearch }) {
  const Cart = useSelector((state) => state.food.Cart);

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      
        <div className="flex items-center space-x-2">
          <img
            src="https://img.icons8.com/pin/100/pizza.png"
            alt="Pizza Icon"
            className="w-7 h-7"
          />
          <NavLink to="/" className="text-orange-600 font-bold text-2xl">
            PizzaHunt
          </NavLink>
        </div>

    
        <nav className="flex space-x-6 text-base font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? 'text-black font-semibold' : 'text-gray-700 hover:text-black'
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/categories"
            className={({ isActive }) =>
              isActive ? 'text-black font-semibold' : 'text-gray-700 hover:text-black'
            }
          >
            Categories
          </NavLink>
          <NavLink
            to="/orders"
            className={({ isActive }) =>
              isActive ? 'text-black font-semibold' : 'text-gray-700 hover:text-black'
            }
          >
            Orders
          </NavLink>
        </nav>

        
        <div className="flex items-center gap-4 w-full md:w-auto">
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search your favorite pizza..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-72 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          />

          
          <NavLink
            to="/cart"
            className="relative flex items-center text-gray-800 hover:text-black"
          >
            <span className="text-xl">🛒</span>
            <span className="absolute -top-2 -right-2 text-xs bg-orange-500 text-white rounded-full px-1.5">
              {Cart.length}
            </span>
          </NavLink>
        </div>
      </div>
    </header>
  );
}
