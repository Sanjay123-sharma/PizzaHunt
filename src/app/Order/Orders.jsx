import React from 'react'
import Header from '../Components/Header and Footer/Header'
import Footer from '../Components/Header and Footer/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router';
import { CancelOrder } from '../Redux/Slice';

export default function Orders() {
    const Order=useSelector((state)=>state.food.Order);
    const dispatch=useDispatch()
    const handleCancel=(orderId)=>{
        dispatch(CancelOrder(orderId))
    }

  return (
    <div>
        <div>
            <Header/>
        </div><br /><br /> 
       
        <div>
            {
                Order.length===0?<h1>No Order Found</h1>:
                Order.map((item)=>(
                    <div key={item.orderId}>
                        <div>{item.name}</div> 
                        <div> Quantity{item.count}</div> 
                       <div>{item.orderId}</div> 
                        <div>
                            <img src={item.image} alt={item.name} />
                        </div>
                        <div >
                         <button onClick={()=>handleCancel(item.orderId)}>Cancel</button>
                        </div>
                        <NavLink to={`/food/${item.id}`}>
                            View Item
                        </NavLink>

                    </div>
                ))
            }
        </div>

        <div>
            <Footer/>
        </div>
      
    </div>
  )
}
