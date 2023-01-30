import React from 'react'
import CurrencyFormat from 'react-currency-format'
import { useNavigate } from 'react-router'
import { getBasketTotal } from '../../../context/AppReducer'
import { useAuth } from '../../../context/GlobalState'
import "./SubTotal.css"

function SubTotal() {
  
  let {basket} = useAuth()
  
  let navigate = useNavigate()
  
  
  
  
  return (
    <div className='subtotal'>
        <CurrencyFormat renderText={(value)=>(
        <>
            <p>SubTotal ({basket.length} items): <strong>{value}</strong></p>
            
            <p className='mb-3'>
                <input type="checkbox"/> This Order Contains a Gift
            </p>
        </>
        )}
        
        decimalScale = {2}
        value = {getBasketTotal(basket)}
        displayType = {"text"}
        thousandSeparator = {true}
        prefix = {"$"}
        />
        
        <button onClick={()=> navigate("/payment")}>Proceed to Checkout</button>
    </div>
  )
}

export default SubTotal