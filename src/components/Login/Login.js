import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from "../../images/login-logo.png"
import "./Login.css"
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth"
import { auth } from '../../firebase'
import { useAuth } from '../../context/GlobalState'

export const Login = () => {
  
  const {user} = useAuth()
  
  let [email, setEmail] = useState("")
  
  let [password, setPassword] = useState("")
  
  let [error, setError] = useState("")
  
  let navigate = useNavigate()
  
  const register = (e)=>{
    e.preventDefault();
    
    createUserWithEmailAndPassword(auth, email, password).then((auth)=>{
        if(auth){
          navigate("/")
        }
    })
    .catch((error=>{
      setError(error.message)
    }))
  }
  
  const signIn = (e)=>{
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password).then((auth)=>{
      if(auth){
        navigate("/")
      }
    })
    .catch((error=>{
      setError(error.message)
    }))
  }
  
  
  return (
    <div className='login'>
        <Link to= "/"><img className='login-logo' src={Logo} alt = "Logo"/></Link>
        
        
        <div className='login-container'>
            <p className='text-center'>{error}</p>
            <h1>Sign In</h1>
            
            <form>
                <h6>Email</h6>
                <input type="email" value={email} onChange = {e=> setEmail(e.target.value)}/>
                
                <h6>Password</h6>
                <input type="password" value={password} onChange = {e=> setPassword(e.target.value)}/>
                
                <button className='login-btn' type='submit' onClick={signIn}>Sign In</button>
                
                <p>By continuing, you agree to Amazon's Fake Clone Conditions of Use and Privacy Notice.</p>
                
                <button className='register-btn' onClick={register}>Create Account</button>
                
            </form>
        </div>
    </div>
  )
}
