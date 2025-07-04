import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const ApiData=createAsyncThunk('Data',async()=>{
    let response=await axios.get('../Data.json');
    return response.data
});

export const MySlice=createSlice({
    name:"food",
    initialState:{
        Data:[],
        loading:false,
        error:null,
        Cart:[],
        Order:[],
    },
    extraReducers:(boiler)=>{
        boiler.addCase(ApiData.pending,(state)=>{
            state.loading=true
        }).addCase(ApiData.fulfilled,(state,action)=>{
            state.loading=false
            state.Data=action.payload
        }).addCase(ApiData.rejected,(state,action)=>{
        state.loading=false
        state.error=action.payload.error
        })

    },reducers:{
        addItem:(state,action)=>{
            let list=state.Data
            let res=list.find((item)=>item.id===action.payload)
            state.Cart.push({
                id:res.id,
                name:res.name,
                count:1,
                image:res.image,
                category:res.category,
                price:Number(res.price)
            })
        },
        removeItem:(state,action)=>{
            state.Cart=state.Cart.filter((item)=>item.id!==action.payload)
        },
        increment:(state,action)=>{
            let res=state.Cart.find((item)=>item.id===action.payload)
            if(res){
                res.count=res.count+1
            }
        },
        decrement:(state,action)=>{
            let res=state.Cart.find((item)=>item.id===action.payload)
            if(res){
                if(res.count<=1){
                    console.log('value cannot be -ve')
                }else{
                    res.count=res.count-1
                }
            }
        },
        addOrders:(state)=>{
            const newOrders=state.Cart.map((item)=>({
                ...item,
                orderId:Date.now()+Math.floor(Math.random() * 1000),
                Delivery_status:false
            }))
            state.Order=[...newOrders,...state.Order]
        },
        removeCart:(state)=>{
            state.Cart=[]
        },
        CancelOrder:(state,action)=>{
            state.Order=state.Order.filter((item)=>item.orderId!==action.payload)
        }
    }
})
export const {addItem,removeItem,increment,decrement,addOrders,removeCart,CancelOrder}=MySlice.actions
export default MySlice.reducer