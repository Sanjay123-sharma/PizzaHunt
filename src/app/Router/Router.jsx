import React, { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router-dom'
import About from '../Components/About Us/About';
const  Orders=lazy(()=>import('../Order/Orders'));
const  Confirmation=lazy(()=>import('../Order/Confirmation'));
const  Shipping=lazy(()=>import('../Shipping/Shipping'));
const Error=lazy(()=>import('../Components/Error/Error'))
const  Category=lazy(()=>import( '../Components/Category/Category'));
const  Cart=lazy(()=>import( '../Components/Cart/Cart'));
const Home=lazy(()=>import('../Components/Home/Home'));
const PDP=lazy(()=>import('../Components/PDP/PDP'));


export default function Router() {
    const router=createBrowserRouter([
        {
            path:"/",
            element:(
         <Suspense fallback={
          <div className="w-20 h-20 border-4 border-dashed rounded-full animate-spin border-orange-500 ml-auto mr-auto display-block  mt-20"></div>

         }>
            <Home/>
         </Suspense>
        
        ),
        errorElement:<Error/>
        },{
          path:"/food/:id",
          element:<PDP/>,
          errorElement:<Error/>
        },{
          path:"/cart",
          element:(
            <Cart/>
          ),
          errorElement:<Error/>
        },
        {
          path:'/categories',
          element:<Category/>,
          errorElement:<Error/>
        },
        {
          path:'/about',
          element:<About/>,
          errorElement:<Error/>
        },
        {
          path:"/shipping",
          element:<Shipping/>,
          errorElement:<Error/>
        },
        {
          path:"/confirmation",
          element:<Confirmation/>,
          errorElement:<Error/>
        },
        {
          path:'/orders',
          element:<Orders/>,
          errorElement:<Error/>
        }
    ])
  return (
    <div>
        <RouterProvider router={router} />
      
    </div>
  )
}
