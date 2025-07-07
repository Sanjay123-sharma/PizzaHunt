import React, { useState } from "react";
import Header from "../Components/Header and Footer/Header";
import Footer from "../Components/Header and Footer/Footer";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addOrders, removeCart } from "../Redux/Slice";
import Swal from "sweetalert2";

export default function Shipping() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [street, setStreet] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [payment, setPayment] = useState("");
  const [formError, setFormError] = useState("");

  
  const Cart = useSelector((state) => state.food.Cart);

  const total = Cart.reduce(
    (x, item) => x + Number(item.price * item.count),
    0
  );
  const totalItems = Cart.length;
  const tax = Math.round(total * 0.08);

  const dispatch = useDispatch();
  const navigate = useNavigate();

 
 const handleMail=async()=>{
    const orderSummary=`
    Order :${Date.now()}
    Items:${totalItems}
    total:₹${total + tax}
    Delivery Address : ${street} ${city} ${zipcode} ${state}
    `;
    
    await fetch(`${process.env.REACT_APP_API_URL}/send-order-mail`,{
      method:'POST',
      headers:{
        'content-type':'application/json'
      },
      body:JSON.stringify({
        to:email,
        name:`${fname}${lname}`,
       orderSummary
      })
    }).then((res)=>{
      res.text().then((data)=>{
        Swal.fire({
  title: "",
  text: "Order Placed Successfully and email Sent!",
  icon: "success",
  iconColor:"orange"
});
      })
    }).catch((err)=>{
      console.log(err)
      Swal.fire({
  title: "",
  text: "Order Placed Successfully but email not Sent!",
  icon: "success",
  iconColor:'orange'
});
    })

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let errorMsg = "";
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (
      !fname ||
      !lname ||
      !email||
      !street ||
      !state ||
      !city ||
      zipcode.length !== 6 ||
      number.length !== 10 
      
    ) {
      errorMsg = "Please fill all delivery fields correctly.";
    } 
    else if (!emailRegex.test(email.trim())) {
      errorMsg = "Enter a valid email";
    } else if (payment === "Cash on Delivery") {
      setFormError("");
      dispatch(addOrders());
       
      dispatch(removeCart());
      setTimeout(() => {
        navigate("/confirmation");
        handleMail()
          
      }, 500);
    } else {
      handleRazorpay();
    }

    if (errorMsg) {
      setFormError(errorMsg);
      return;
    }
  };

 
  const handleRazorpay = () => {
    // in option we add configurations
    const options = {
      key: "rzp_test_10bPvq7zFtWaxp",
      amount: (total + tax) * 100,
      currency: "INR",
      name: "PizzaHunt",
      description: "Pizza Order Payment",
      handler: function (response) {
        // On payment success
        dispatch(addOrders());
        dispatch(removeCart());

        navigate("/confirmation");
         handleMail()
       
      },
      // in prefill we add user details
      prefill: {
        name: `${fname} ${lname}`,
        contact: `${number}`,
      },
      notes: {
        address: `${street}, ${city}, ${state}, ${zipcode}`,
      },
      theme: {
        color: "#F97316",
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header /> <br />
      <br />
      <div className="max-w-7xl mx-auto px-4 py-10">
  <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center sm:text-left">Checkout</h1>

  <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
    <div className="lg:col-span-2 bg-white p-4 sm:p-6 rounded shadow">
      <h2 className="text-xl sm:text-2xl font-semibold mb-4">Delivery Information</h2>

      {formError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm sm:text-base">
          <strong>Error:</strong> {formError}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="First Name"
          value={fname}
          onChange={(e) => setFname(e.target.value)}
          className="w-full px-4 py-2 border rounded text-sm sm:text-base"
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lname}
          onChange={(e) => setLname(e.target.value)}
          className="w-full px-4 py-2 border rounded text-sm sm:text-base"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Email"
          className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm sm:text-base"
        />
        <input
          type="text"
          placeholder="Street Address"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
          className="sm:col-span-2 w-full px-4 py-2 border rounded"
        />
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full px-4 py-2 border rounded text-sm sm:text-base"
        />
        <input
          type="text"
          placeholder="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
          className="w-full px-4 py-2 border rounded text-sm sm:text-base"
        />
        <input
          type="text"
          inputMode="numeric"
          maxLength="6"
          placeholder="ZIP Code"
          value={zipcode}
          onChange={(e) => setZipcode(e.target.value)}
          className="sm:col-span-2 w-full px-4 py-2 border rounded"
        />
        <input
          type="number"
          maxLength="10"
          placeholder="Enter 10 digit Mobile Number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          className="sm:col-span-2 w-full px-4 py-2 border rounded"
        />
      </div>

      <div className="mt-8">
        <h2 className="text-xl sm:text-2xl font-semibold mb-2">Payment Method</h2>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center mb-4 text-sm sm:text-base">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="payment"
              value="Credit/Debit"
              onChange={(e) => setPayment(e.target.value)}
            />
            Credit/Debit
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="payment"
              value="Cash on Delivery"
              onChange={(e) => setPayment(e.target.value)}
            />
            Cash on Delivery
          </label>
        </div>
      </div>

      <button
        type="submit"
        className="w-full mt-8 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-md text-base sm:text-lg transition duration-200"
      >
        {payment === "Cash on Delivery" ? (
          <h2>Place Order</h2>
        ) : (
          <h2>Pay Now</h2>
        )}
      </button>
    </div>

    <Summary2 total={total} totalItems={totalItems} tax={tax} />
  </form>
</div>

      <Footer />
    </div>
  );
}

export const Summary2 = ({ total, totalItems, tax }) => {
  return (
    <div className="bg-white p-6 rounded shadow h-fit">
      <h2 className="text-xl font-bold mb-4">Order Summary</h2>
      <div className="flex justify-between mb-2">
        <span>Subtotal ({totalItems} items)</span>
        <span>₹{total.toFixed(2)}</span>
      </div>
      <div className="flex justify-between mb-2">
        <span>Delivery Fee</span>
        <span className="text-green-600">Free</span>
      </div>
      <div className="flex justify-between mb-4">
        <span>Tax (8%)</span>
        <span>₹{tax}</span>
      </div>
      <hr className="my-4" />
      <div className="flex justify-between text-lg font-semibold mb-6">
        <span>Total</span>
        <span>₹{(total + tax).toFixed(2)}</span>
      </div>
    </div>
  );
};
