import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React, { useEffect, useState } from 'react'
import CurrencyFormat from 'react-currency-format'
import { Link, useNavigate } from 'react-router-dom'
import { getBasketTotal } from '../../context/AppReducer'
import { useAuth } from '../../context/GlobalState'
import CheckoutProduct from '../Checkout/CheckoutProduct/CheckoutProduct'
import "./Payment.css"
import Axios from "./Axios"
import {doc, setDoc} from "firebase/firestore"
import {db} from "../../firebase"

function Payment() {
  
  let {dispatch, basket, user} = useAuth()
  
  let [clientSecret, setClientSecret] = useState()
  
  const [error, setError] = useState(null)
  
  const [disabled, setDisabled] = useState(true)
  
  const [succeeded, setSucceeded] = useState(false)
  
  const [proccessing, setProccessing] = useState("")
  
  const stripe = useStripe()
  
  const elements = useElements()
  
  let navigate = useNavigate()
  
  
  useEffect(()=>{
    const getClientSecret = async() =>{
        const response = await Axios({
            method : "post",
            url : `/payments/create?total=${getBasketTotal(basket) * 100}`
        })
        
        setClientSecret(response.data.clientSecret)
        
        return response
    }
    
    getClientSecret()
    },[basket])
  
  let handleChange = (e)=>{
    setDisabled(e.empty)
    setError(e.error !== undefined ? e.error.message : "")
  }
  
  let handleSubmit = async (e)=>{
    e.preventDefault()
    
    
    setProccessing(true)
    
    const payload = await stripe.confirmCardPayment(clientSecret, {
        payment_method:{
            card: elements.getElement(CardElement)
        }
    }).then(({paymentIntent})=>{
        
        let ref = doc(db, "users", user ? user.uid : "", "orders", paymentIntent.id)
        
        setDoc(ref, {
            basket : basket,
            amount : paymentIntent.amount,
            created : paymentIntent.created
        })
        
        setSucceeded(true)
        setError(null)
        setProccessing(false)
        navigate("/orders", {replace : true})
        
        dispatch({
            type: "EMPTY_BASKET"
        })
    })
  }
  
  return (
    <div className='payment'>
        <h3 className='text-center'>Checkout (<Link to= "/checkout">{basket.length} Items</Link>)</h3>
        
        <div className='container'>
            <div className='row d-flex align-items-center'>
                <div className='col-lg-3 p-4 payment-title'>
                    <h5>Delevery Address</h5>
                </div>
                
                <div className='col-lg-9 p-4 payment-address'>
                    <p>{user ? user.email : ""}</p>
                    <p>Menofia, Egypt</p>
                </div>
            </div>
                
            <hr/>
            
            <div className='row'>
                <div className='col-lg-3 p-4 payment-title'>
                    <h5>Review Items and Delevery</h5>
                </div>
                
                <div className='col-lg-9 p-4 payment-items'>
                    {
                        basket.length > 0 ?
                            basket.map((item, index)=>(
                                <CheckoutProduct key={index} id = {item.id} title = {item.title} img = {item.img} price = {item.price} rating = {item.rating}/>
                            ))
                            :
                            <h4 className='text-center'>No Items Exists In Basket</h4>
                    }
                </div>
            </div>
                
            <hr/>
                
                
            <div className='row'>
                <div className='col-lg-3 p-4 payment-title'>
                    <h5>Payment Method</h5>
                </div>
                
                <div className='col-lg-9 p-4 payment-price'>
                    <form onSubmit={handleSubmit}>
                        <CardElement onChange={handleChange}/>
                            
                            <CurrencyFormat renderText={(value)=>(
                                    <h6 className='mt-3'>Order Total {value}</h6>
                                )}
                                
                                decimalScale = {2}
                                value = {getBasketTotal(basket)}
                                displayType = {"text"}
                                thousandSeparator = {true}
                                prefix = {"$"}
                        />
                        
                        <button type='submit' disabled = {proccessing || disabled || succeeded}>{proccessing ? "proccessing" : "Buy Now"}</button>
                    </form>
                    
                </div>
                
                {error && <div className='text-center'>{error}</div>}
            </div>
        </div>
    </div>
  )
}

export default Payment