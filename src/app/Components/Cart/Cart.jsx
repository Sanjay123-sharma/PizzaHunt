import React from 'react';
import Header from '../Header and Footer/Header';
import Footer from '../Header and Footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router';
import { decrement, increment, removeItem } from '../../Redux/Slice';

export default function Cart() {
  const Cart = useSelector((state) => state.food.Cart);
  const total = Cart.reduce((x, item) => x + item.count * item.price, 0);
  const totalItems = Cart.length;
  const tax = Math.round(total * 0.08);
  const dispatch=useDispatch()

  const handleIncrement=(id)=>{
    dispatch(increment(id))
  }
  const handleDecrement=(id)=>{
    dispatch(decrement(id))
  }

  
  return (
    <div className="bg-gray-50 min-h-screen">
      <Header /> <br /><br />

      <div className="max-w-7xl mx-auto px-4 py-10">
        {Cart.length === 0 ? (
          <h1 className="text-center text-2xl text-orange-600 font-semibold mt-20 ml-20">Cart is Empty</h1>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-6">Order Cart</h2>
              {Cart.map((item) => (
                <div
                  key={item.id}
                 className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 mb-4 rounded-lg shadow"
                >
                
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <p className="text-orange-600 font-semibold">₹{item.price}</p>
                    </div>
                  </div>

                  {/* Quantity Control */}
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1 border rounded text-xl"
                    onClick={()=>handleDecrement(item.id)}
                    >−</button>
                    <div className="font-medium">{item.count}</div>
                    <button className="px-3 py-1 border rounded text-xl"
                    onClick={()=>handleIncrement(item.id)}
                    >+</button>
                  </div>

                  {/* Total Price */}
                  <div className="text-lg font-semibold">₹{(item.price * item.count).toFixed(2)}</div>

                 
                  <button className="text-red-500 hover:text-red-700 text-xl"
                  onClick={()=>dispatch(removeItem(item.id))}
                  >🗑️</button>
                </div>
              ))}
            </div>

            {/* Summary Section */}
            <Summary total={total} totalItems={totalItems} tax={tax} />
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export const Summary = ({ total, totalItems, tax }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Order Summary</h2>

      <div className="flex justify-between mb-2">
        <span className="text-gray-700">Subtotal ({totalItems} items)</span>
        <span className="text-gray-800 font-medium">₹{total.toFixed(2)}</span>
      </div>

      <div className="flex justify-between mb-2">
        <span className="text-gray-700">Delivery Fee</span>
        <span className="text-green-800 font-medium">Free</span>
      </div>

      <div className="flex justify-between mb-4">
        <span className="text-gray-700">Tax (8%)</span>
        <span className="text-gray-800 font-medium">₹{tax}</span>
      </div>

      <hr className="my-4" />

      <div className="flex justify-between text-lg font-semibold mb-6">
        <span>Total</span>
        <span>₹{(total+ tax).toFixed(2)}</span>
      </div>

      <NavLink to={'/shipping'}>
        <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-md text-lg mb-3">
        Proceed to Checkout
      </button>
      </NavLink>

      <NavLink to={'/'}>
        <button className="w-full border border-gray-300 py-2 rounded-md text-gray-600 hover:bg-gray-100">
        Continue Shopping
      </button>
      </NavLink>
    </div>
  );
};
