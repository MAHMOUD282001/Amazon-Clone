import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/GlobalState'
import { auth } from '../../firebase'
import Logo from "../../images/header-logo.png"
import searchIcon from "../../images/icons/searchIcon.png"
import cartIcon from "../../images/icons/shopping-cart.png"
import "./Header.css"
import { faShoppingBasket, faSearch, faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const Header = () => {
  
  let {user, basket} = useAuth()
  
  let signOut = ()=>{
    auth.signOut()
  }
  
  let menuRef = useRef()
  
  let menuToggle = ()=> menuRef.current.classList.toggle("active__menu")
  
  return (
    <header>
        <Link to= "/" className='logo-link'><img className='header-logo' src={Logo} alt = "Logo"/></Link>
        
        <div className='header-search'>
            <input type= "text" className='header-searchInput'/>
            
            <div className='header-searchIcon'><FontAwesomeIcon icon={faSearch} /></div>
        </div>
        
        <div className='header-nav' onClick={menuToggle} ref={menuRef}>
            <div className='menu'>
                <Link to= {user ? "/" : "/login"} onClick = {signOut}>
                    <div className='header-option'>
                        <div className='header-option-one'>Hello {user ? user.email : "Guest"}</div>
                        <div className='header-option-two'>{user ? "Sign out" : "Sign In"}</div>
                    </div>
                </Link>
                
                <Link to= "/orders">
                    <div className='header-option'>
                        <div className='header-option-one'>Returns</div>
                        <div className='header-option-two'>& Orders</div>
                    </div>
                </Link>
                
                <div className='header-option'>
                    <div className='header-option-one'>Your</div>
                    <div className='header-option-two'>Prime</div>
                </div>
                
                <Link to= "/checkout">
                    <div className='header-option flex'>
                        <div className='header-option-basket'><FontAwesomeIcon icon={faShoppingBasket} /></div>
                        <div className='header-option-two header-basket-count'>{basket.length}</div>
                    </div>
                </Link>
            </div>
        </div>
        
        <div className='menu-icon' onClick={menuToggle}><FontAwesomeIcon icon={faBars} /></div>
    </header>
  )
}

export default Header