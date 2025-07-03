import React, { useEffect, useState } from 'react'
import Footer from '../Header and Footer/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { addItem, ApiData } from '../../Redux/Slice'
import { NavLink } from 'react-router'
import Swal from 'sweetalert2'
import HomeHeader from '../Header and Footer/HomeHeader'

export default function Category() {
  const dispatch = useDispatch()
  const Data = useSelector((state) => state.food.Data)
  const Cart = useSelector((state) => state.food.Cart)
  const [category, setCategory] = useState('All')
  const [search,setSearch]=useState('')
  const [query,setQuery]=useState('')
  useEffect(() => {
    let timer=setTimeout(() => {
      setQuery(search)
    }, 1000);
    dispatch(ApiData())
    
    return ()=>clearTimeout(timer)
  }, [dispatch,search])
// filterCategory
  const filterCategory = category === 'All'
    ? Data
    : Data.filter((item) => item.category === category)
    
// filterSearch
    const filterSearch=filterCategory.filter((item)=>{
      return item.name.replace(/\s+/g, '').toLowerCase().includes(query.replace(/\s+/g, '').toLowerCase())
    })

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
    <div className="bg-gray-50 min-h-screen">
      <HomeHeader search={search} setSearch={setSearch}/><br /><br />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Pizza Categories</h1>
        <p className="text-gray-600 mb-6">Browse our delicious pizzas by category</p>

        {/* Radio Buttons */}
        <div className="mb-6 flex space-x-6">
  <label className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg border border-orange-400 bg-orange-50 hover:bg-orange-100 transition">
    <input
      type="radio"
      value="All"
      checked={category === 'All'}
      onChange={(e) => setCategory(e.target.value)}
      className="form-radio text-orange-500 focus:ring-orange-500"
    />
    <span className="text-orange-700 font-medium">All</span>
  </label>

  <label className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg border border-green-400 bg-green-50 hover:bg-green-100 transition">
    <input
      type="radio"
      value="Veg"
      checked={category === 'Veg'}
      onChange={(e) => setCategory(e.target.value)}
      className="form-radio text-green-500 focus:ring-green-500"
    />
    <span className="text-green-700 font-medium">Veg</span>
  </label>

  <label className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg border border-red-400 bg-red-50 hover:bg-red-100 transition">
    <input
      type="radio"
      value="Non-Veg"
      checked={category === 'Non-Veg'}
      onChange={(e) => setCategory(e.target.value)}
      className="form-radio text-red-500 focus:ring-red-500"
    />
    <span className="text-red-700 font-medium">Non-Veg</span>
  </label>
</div>


        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filterSearch.length > 0 ? (
            filterSearch.map((item) => (
                <div
                key={item.id}
                className="bg-white rounded-xl shadow-md overflow-hidden relative"
              >
              <NavLink to={`/food/${item.id}`}>
                
                <span className="absolute top-2 right-2 bg-gray-100 text-xs px-2 py-1 rounded-full text-gray-600">
                  {item.category}
                </span>
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-sm text-gray-500">{item.description || 'Tasty and delicious!'}</p>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-orange-600 font-bold text-lg">₹{item.price}</span>
                    <span className="text-yellow-500 text-sm">⭐ {item.rating || '4.5'}</span>
                  </div>
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
          
            ))
          ) : (
            <p className="text-center text-gray-500 text-lg">No items found in this category.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}
