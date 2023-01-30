import React from 'react'
import moment from "moment"
import CheckoutProduct from '../Checkout/CheckoutProduct/CheckoutProduct'
import CurrencyFormat from 'react-currency-format'

function Order({order}) {
  return (
    <div className='order mt-5'>
        <h5>Order</h5>
        <p>{moment.unix(order.data.created).format("MMMM DD YYYY h:mma")}</p>
        
        
        {
            order.data.basket.map(item => (
                <CheckoutProduct hiddenButton key={item.id} id = {item.id} title = {item.title} img = {item.img} price = {item.price} rating = {item.rating}/>
            ))
        }
        
        <CurrencyFormat renderText={(value)=>(
            <h6 className='mt-3 d-flex justify-content-end'>Order Total {value}</h6>
            )}
            
            decimalScale = {2}
            value = {order.data.amount * 100}
            displayType = {"text"}
            thousandSeparator = {true}
            prefix = {"$"}
        />
    </div>
  )
}

export default Order