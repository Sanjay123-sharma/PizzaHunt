import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, ApiData } from '../../Redux/Slice';

import Footer from '../Header and Footer/Footer';
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import HomeHeader from '../Header and Footer/HomeHeader';

export default function Home() {
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(6);

  const dispatch = useDispatch();
  const Data = useSelector((state) => state.food.Data);
  const Cart = useSelector((state) => state.food.Cart);
  const searchData = Data.filter((item) =>
   item.name.replace(/\s+/g, '').toLowerCase().includes(query.replace(/\s+/g, '').toLowerCase())
  );

  useEffect(() => {
    function handleScroll() {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100) {
        setVisibleCount((prev) =>
          prev + 6 > searchData.length ? searchData.length : prev + 6
        );
      }
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [searchData.length]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setQuery(search);
      dispatch(ApiData());
    }, 500);

    return () => clearTimeout(timer);
  }, [dispatch, search]);

  const handleAdd=(id)=>{
    let list=Cart
    let res=list.find((item)=>item.id===id)
    if(res){
        Swal.fire({
  position: "top-end", 
  title: "Item Already Added ",
  showConfirmButton: false,
  timer: 1500
});
    }else{
        Swal.fire({
  position: "top-end",
  icon: "success",
  title: "Item has been Added to Cart",
  showConfirmButton: false,
  timer: 1500,
  iconColor:"orange"
});
    dispatch(addItem(id))
    }

  }

  return (
    <div>
      <HomeHeader search={search} setSearch={setSearch} />

      {/* Hero Banner */}
      <div className="pt-20 bg-[#fff4f1] text-center px-4 py-16 rounded-md mt-10">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
          Fresh & Delicious Pizza
        </h2>
        <p className="text-gray-600 text-lg sm:text-xl mb-6">
          Made with the finest ingredients and delivered hot to your door.
          <br />
          Experience the taste of authentic Italian pizza.
        </p>
        <NavLink to="/about">
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-3 rounded-md text-lg mr-4">
            About Us
          </button>
        </NavLink>
      </div>

      
     

      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {searchData.slice(0, visibleCount).map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow hover:shadow-lg transition duration-300 overflow-hidden"
          >
            <NavLink to={`/food/${item.id}`}>
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-52 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
                <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                <p className="text-orange-600 font-semibold mt-2">₹{item.price}</p>
              </div>
            </NavLink>
            <div className="px-4 pb-4">
              <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 rounded-md mt-2 disabled:opacity-60"
              disabled={!item.inStock}
              onClick={()=>handleAdd(item.id)}
              >
                {item.inStock?'ADD to Cart':'Out of Stock'}
              </button>
            </div>
           
          </div>
        ))}
        <div>
           {searchData.length === 0 && (
    <p className="col-span-full text-center text-xl text-gray-500 font-semibold mt-10">
      No item Found.
    </p>
  )}
        </div>
      </div>

      
      <Footer />
    </div>
  );
}
