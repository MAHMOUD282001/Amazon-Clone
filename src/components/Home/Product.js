import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import "./Product.css"
import {useAuth} from "../../context/GlobalState"

function Product({img, price, title, rating, id}) {
  const {dispatch, basket} = useAuth()
  const addToBasket = ()=>{
    dispatch({
        type: "ADD_TO_BASKET",
        item: {
            id: id,
            title: title,
            img: img,
            price: price,
            rating: rating
        }
    })
  }
  
  return (
    <div className='product'>
        <div className='product-info'>
            <p>{title}</p>
            <p className='product-price'>
                <small>$</small>
                <strong>{price}</strong>
            </p>
        </div>
        
        <div className='product-rating'>
            {
                Array(rating).fill().map((_, index)=>(
                    <span><FontAwesomeIcon icon={faStar}/></span>
                ))
            }
        </div>
        
        <img src= {img} alt = "Product"/>
        <button onClick={addToBasket}>Add To Basket</button>
    </div>
  )
}

export default Product