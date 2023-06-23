//Profile to show that user is logged in, can only access if logged in
import React from 'react'
import { NavLink } from 'react-router-dom';
import './Profile.css'


function Profile() {
  return (
    <div className='profile'>
        <h1>You have been verified and are logged in</h1>

        <div className='recovery_section'>
        <NavLink to='/passwordrecovery'>
                <span>Change Password</span>
            </NavLink>
            <NavLink to='/usernamerecovery'>
                <span>Change Username</span>
            </NavLink>

        </div>
    </div>
  )
}

export default Profile;