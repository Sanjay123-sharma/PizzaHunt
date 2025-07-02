import React from 'react';
import Header from '../Header and Footer/Header';
import Footer from '../Header and Footer/Footer';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function PDP() {
  const { id } = useParams();
  const Data = useSelector((state) => state.food.Data);
  const Item = Data.find((item) => item.id.toString() === id);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header /><br />
      
      {
        !Item ?<div className="min-h-screen flex items-center justify-center text-xl font-semibold text-gray-700">
          Item not found.
        </div>:
         
      <div className="max-w-5xl mx-auto px-4 py-12 flex flex-col md:flex-row items-start gap-10">
        {/* Image Section */}
        <div className="w-full md:w-1/2">
          <img
            src={Item.image}
            alt={Item.name}
            className="w-full rounded-lg shadow-md object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">{Item.name}</h2>
          <p className="text-lg text-gray-600 mb-4">{Item.description}</p>

          <div className="mb-2 text-gray-700">
            <span className="font-semibold">Category: </span>
            {Item.category}
          </div>
          <div className="mb-2 text-gray-700">
            <span className="font-semibold">Price: </span>₹{Item.price}
          </div>
          <div className="mb-2 text-gray-700">
            <span className="font-semibold">Rating: </span>{Item.rating} ⭐
          </div>
          <div className="mb-6 text-gray-700">
            <span className="font-semibold">Availability: </span>
            {Item.inStock ? (
              <span className="text-green-600 font-semibold">In Stock</span>
            ) : (
              <span className="text-red-600 font-semibold">Out of Stock</span>
            )}
          </div>

          <button
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-md text-lg disabled:opacity-60"
            disabled={!Item.inStock}
          >
            {Item.inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
      }

      <Footer />
    </div>
  );
}
