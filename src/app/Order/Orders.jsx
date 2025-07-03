import React, { useState } from 'react';
import Header from '../Components/Header and Footer/Header';
import Footer from '../Components/Header and Footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { CancelOrder } from '../Redux/Slice';
import Swal from 'sweetalert2';

export default function Orders() {
  const Order = useSelector((state) => state.food.Order);
  const dispatch = useDispatch();
  const [loadingId, setLoadingId] = useState(null);

  const handleCancel = (orderId) => {
    setLoadingId(orderId);
    Swal.fire({
      title: 'Are you sure you want to cancel this order?',
      text: "This action cannot be undone.",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#f97316',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, cancel it',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(CancelOrder(orderId));
        Swal.fire({
          title: 'Cancelled!',
          text: 'Your order has been cancelled.',
          icon: 'success',
          confirmButtonColor: '#f97316',
        });
      }
      setLoadingId(null);
    });
  };

  return (
    <div className="min-h-screen bg-[#fefefe]">
      <Header /><br /><br />
      <div className="max-w-5xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-orange-600 text-center mb-8">
          Your Orders
        </h1>

        {Order.length === 0 ? (
          <h2 className="text-center text-xl text-gray-500">No Orders Found</h2>
        ) : (
          <div className="flex flex-col gap-6">
            {Order.map((item) => (
              <div
                key={item.orderId}
                className="flex flex-col md:flex-row items-start gap-5 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition p-4 bg-white"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-28 h-28 rounded-lg object-cover border"
                />

                <div className="flex-1 w-full">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
                    <span className="text-sm text-gray-500">
                      Order ID: <span className="font-medium">{item.orderId}</span>
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 mt-1">
                    Quantity: <span className="font-medium">{item.count}</span>
                  </p>

                  <NavLink
                    to={`/food/${item.id}`}
                    className="text-orange-500 text-sm mt-2 inline-block hover:underline"
                  >
                    View Item →
                  </NavLink>

                  <div className="mt-3">
                    <span
                      className={`inline-block px-3 py-1 text-xs rounded-full font-semibold ${
                        item.Delivery_status
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {item.Delivery_status ? 'Delivered' : 'Pending'}
                    </span>
                  </div>

                  <button
                    onClick={() => handleCancel(item.orderId)}
                    disabled={loadingId === item.orderId}
                    className={`mt-4 px-4 py-2 rounded-md text-white text-sm font-medium ${
                      loadingId === item.orderId
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-red-500 hover:bg-red-600'
                    }`}
                  >
                    {loadingId === item.orderId ? 'Processing...' : 'Cancel Order'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
