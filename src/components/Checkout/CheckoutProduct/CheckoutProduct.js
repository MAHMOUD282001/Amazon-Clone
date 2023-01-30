import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useAuth } from '../../../context/GlobalState'
import "./CheckoutProduct.css"

function CheckoutProduct({id, img, title, price, rating, hiddenButton}) {
  
  let {dispatch} = useAuth()
  
  let removeItem = ()=>{
    dispatch({
        type: "REMOVE_FROM_BASKET",
        id : id
    })
  }
  
  return (
    <div className='checkout-product mt-4'>
        
        <div className='row mb-5'>
            <div className='col-md-2'>
                <img src= {img} alt = "Product"/>
            </div>
            
            <div className='checkout-product-info col-md-10 mt-md-0 mt-5'>
                <h6 className='checkout-product-title'>{title}</h6>
                <p className='checkout-product-price'>
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                
                <div className='checkout-product-rating'>
                    {
                        Array(rating).fill().map((_, index)=>(
                            <span><FontAwesomeIcon icon={faStar}/></span>
                        ))
                    }
                </div>
                
                
                {
                    !hiddenButton && <button className='mt-4' onClick={removeItem}>Remove From Basket</button>
                }
                
            </div>
            
        </div>
    </div>
  )
}

export default CheckoutProduct