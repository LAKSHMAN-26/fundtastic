import React, { useState } from 'react'
import '../styles/Authenticate.css'
import Login from '../pages/Login'
import Register from '../pages/Register'
import {useNavigate} from 'react-router-dom'

const Authenticate = () => {

  const [authType, setAuthType] = useState('login');

  const navigate = useNavigate();

  return (


    <div className="AuthenticatePage">

        <div className="auth-navbar">
          <h3 onClick={()=> navigate('/landing')} >SB Funds</h3>
          <p onClick={()=> navigate('/landing')} >Home</p>
        </div>

        {authType==='login' ?
        <>
            <Login setAuthType={setAuthType} />
        </>
        :
        <>
            <Register setAuthType={setAuthType} />
        </>
        }

    </div>
  )
}

export default Authenticate