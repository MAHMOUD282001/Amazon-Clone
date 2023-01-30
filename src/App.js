import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router'
import Checkout from './components/Checkout/Checkout'
import Header from './components/Header/Header'
import Home from './components/Home/Home'
import { Login } from './components/Login/Login'
import Orders from './components/Orders/Orders'
import Payment from './components/Payment/Payment'
import { useAuth } from './context/GlobalState'
import { auth } from './firebase'

function App() {
  const {dispatch} = useAuth()
  
  let stripePromise = loadStripe("pk_test_51MVuJAKO1vEm3tFYd53jewAueCIbt7x6AigXUJK8csA0wlkbvj524a2Q4nKRgsV6wGeMhQuw0j8MouNjK25eEPgU00KWKux1ms")
  
  useEffect(()=>{
    auth.onAuthStateChanged((authUser)=>{
      if(authUser){
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      }
      
      else{
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })
  },[])
  
  
  return (
    <div className='app'>
      <Header/>
      
      <Routes>
        <Route path='/' element = {<Home/>}/>
        
        <Route path='/login' element = {<Login/>}/>
        
        <Route path='/orders' element = {<Orders/>}/>
        
        <Route path='/checkout' element = {<Checkout/>}/>
        
        <Route path='/payment' element = {
        
        <Elements stripe={stripePromise}>
          <Payment/>
        </Elements>
        }/>
        
        <Route path='*' element = {<h1>Page Not Found</h1>}/>
        
      </Routes>
    </div>
  )
}

export default App