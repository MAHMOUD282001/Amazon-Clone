import React from 'react'
import { useAuth } from '../../context/GlobalState'
import ad from "../../images/checkoutAd.jpg"
import CheckoutProduct from './CheckoutProduct/CheckoutProduct'
import SubTotal from './SubTotal/SubTotal'


const Checkout = () => {
  
  const {user, basket} = useAuth()
  console.log(user)
  
  return (
    <div className='checkout'>
        <div className='container-fluid'>
            <div className='row'>
                <div className='checkout-left col-lg-9'>
                    <img className='mt-3' src= {ad} alt = "Ad"/>
                    <h5 className='mt-3 mb-3'>Hello, {user? user.email : ""}</h5>
                    
                    <h4 className='checkout-title mb-4'>Your Shopping Basket</h4>
                    
                    <hr/>
                    
                    {
                        basket.length > 0 ?
                            basket.map((item, index)=>(
                                <CheckoutProduct key={index} id = {item.id} title = {item.title} img = {item.img} price = {item.price} rating = {item.rating}/>
                            ))
                            :
                            <h4 className='text-center'>No Items Exists In Basket</h4>
                    }
                    
                </div>
                
                <div className='checkout-left col-lg-3 mt-3'>
                    <SubTotal/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Checkout