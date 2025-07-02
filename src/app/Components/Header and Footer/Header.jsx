import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

export default function Header() {
  const Cart=useSelector((state)=>state.food.Cart)
  return (
    <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-2">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3132/3132693.png"
            alt="Pizza Icon"
            className="w-6 h-6"
          />
          <NavLink to={'/'}>
            <h1 className="text-orange-600 font-bold text-xl">PizzaHunt</h1>
          </NavLink>
        </div>

        {/* Navigation */}
        <div className="flex space-x-6 font-medium">
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
        </div>

        {/* Cart Icon with Text */}
        <div className="flex items-center space-x-1 text-gray-800 hover:text-black">
          <NavLink to="/cart" className="flex items-center space-x-1 font-medium">
            <span className="text-lg text-orange-600">🛒{Cart.length}</span>
            
          </NavLink>
        </div>
      </div>
    </header>
  );
}
