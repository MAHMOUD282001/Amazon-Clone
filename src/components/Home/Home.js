import React from 'react'
import homeImg from "../../images/home.jpg"
import Product from './Product'
import "./Home.css"
import product1 from "../../images/products/1.png"
import product2 from "../../images/products/2.png"
import product3 from "../../images/products/3.png"
import product4 from "../../images/products/4.png"
import product5 from "../../images/products/5.png"
import product6 from "../../images/products/6.png"



function Home() {
  return (
    <div className='home'>
      <img className='home-img' src={homeImg} alt = "Home"/>
      
      <div className='container'>        
          <div className='row'>
            <div className='col-lg-6'>
              <Product id = {1} img = {product1} price = {100} title = "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem" rating = {5}/>
            </div>
            <div className='col-lg-6'>
              <Product id = {2} img = {product2} price = {100} title = "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem" rating = {4}/>
            </div>
          </div>
          
          <div className='row'>
            <div className='col-lg-4'>
              <Product id = {3} img = {product3} price = {100} title = "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem" rating = {3}/>
            </div>
            <div className='col-lg-4'>
              <Product id = {4} img = {product4} price = {100} title = "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem" rating = {5}/>
            </div>
            <div className='col-lg-4'>
              <Product id = {5} img = {product5} price = {100} title = "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem" rating = {2}/>
            </div>
          </div>
          
          <div className='row'>
            <div className='col-lg-12'>
              <Product id = {6} img = {product6} price = {100} title = "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem" rating = {4}/>
            </div>
          </div>
      </div>
    </div>
  )
}

export default Home