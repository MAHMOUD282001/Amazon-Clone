import {query, collection, onSnapshot, orderBy } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/GlobalState'
import { db } from '../../firebase'
import Order from './Order'
import "./Orders.css"

function Orders() {
  
  let {user} = useAuth()
  
  let [orders, setOrders] = useState([])
  
  useEffect(()=>{
    if(user){
      const collRef = collection(db, "users", user ? user.uid : "", "orders")
      
      const orderedRef = query(collRef, orderBy("created", "desc"))
      
      onSnapshot(orderedRef , (querySnapshot) => {
        setOrders(
          querySnapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data()
          }))
        )
      })
    }
    else{
      setOrders([])
    }
  },[user])
  
  
  return (
    <div className='orders'>
      <div className='container'>
        <h3 className='mb-3 pt-5'>Orders</h3>
        <div className='all-orders'>
          {orders.map(order => (
            <Order order = {order}/>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Orders