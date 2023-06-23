//simple header


import React, {useContext} from 'react'
import { NavLink } from 'react-router-dom'
import AuthContext from '../../store/authcontext'
import './Header.css'

function Header() {
    const authCtx = useContext(AuthContext)

    const logout = () => {
       alert('You have been Logged out')
      authCtx.logout()
      }

  return (
    <div className='header'>
        <NavLink to='/admin'>
            <p>Admin Page</p>
        </NavLink>
        <NavLink to='/login'>
            <p>Login or Sign Up</p>
        </NavLink>
        <NavLink to='/profile'>
            <p>Profile</p>
        </NavLink>
        <NavLink to='/a'>
            <p>Page A access</p>
        </NavLink>
        <NavLink to='/b'>
            <p>Page B access</p>
        </NavLink>
        <NavLink to='/c'>
            <p>Page C access</p>
        </NavLink>
        <button className='logout-btn' onClick={() => logout()} >Logout</button>
    </div>
  )
}

export default Header