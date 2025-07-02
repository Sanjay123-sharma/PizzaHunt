import React from 'react';
import Header from '../Components/Header and Footer/Header';
import Footer from '../Components/Header and Footer/Footer';
import { useNavigate } from 'react-router-dom';

export default function Confirmation() {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Header /><br /><br />

      <main className="flex-grow flex items-center justify-center px-4 py-10">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl w-full text-center">
          
          <div className="flex justify-center mb-4">
            <svg
              className="w-12 h-12 text-green-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
          <p className="text-gray-600 mb-6">
            Thank you for your order. We're preparing your delicious pizza!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
          <span className="bg-gray-100 px-4 py-2 rounded-full text-sm font-medium text-gray-700">
            Order #ORD-{new Date().toDateString()}
          </span>
          <span className="bg-gray-100 px-4 py-2 rounded-full text-sm font-medium text-green-700">
            Confirmed
          </span>
        </div><br />

          <div className="bg-gray-100 rounded-lg p-6 text-left mb-6">
            <div className="flex items-center gap-2 mb-2 text-gray-700">
              <span>
                Estimated delivery: <strong>25–35 minutes</strong>
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <span>Delivering to your address</span>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mt-4 text-sm">
              <p className="font-semibold mb-1">What happens next?</p>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>We’ll start preparing your order immediately</li>
                <li>You’ll receive SMS updates on your order status</li>
                <li>Our delivery driver will contact you when nearby</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => navigate('/orders')}
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-md"
            >
              Track Your Order
            </button>
            <button
              onClick={() => navigate('/')}
              className="bg-white border border-orange-500 text-orange-500 hover:bg-orange-50 font-semibold px-6 py-3 rounded-md"
            >
              Order More Pizza
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
