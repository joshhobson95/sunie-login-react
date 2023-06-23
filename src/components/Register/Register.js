//Login and Signup page, switches with button 

import {useState} from 'react'
import axios from 'axios'
import './Register.css'





function Register() {

      
const [username, setUsername] = useState('')
const [password, setPassword] = useState('')
const [email, setEmail] = useState('')
const [phoneNumber, setPhoneNumber] = useState('')
const [legalName, setLegalName] = useState('')
const [accountType, setAccountType]= useState('')


const submitHandler = e => {
    e.preventDefault()
    console.log('submitHandler called')
     const body = {
         username,
         password, 
         email, 
         phoneNumber,
         legalName,
         accountType
     }
     const url = 'http://localhost:5050'
     axios.post(`${url}/register`, body)
         .then((res) => {
            alert('User Created')
         })
         .catch(error => {
             setUsername('')
             setPassword('')
             setEmail('')
             setPhoneNumber('')
             setLegalName('')
             setAccountType('')
             console.log('ERROR')
             alert('Problem creating user, check console')
         })
     axios.post(`${url}/emailuser`, body)
         .then((res) => {
            alert('Email sent to user')
         })
         .catch(error => {
             setUsername('')
             setPassword('')
             setEmail('')
             setPhoneNumber('')
             setLegalName('')
             setAccountType('')
             console.log('ERROR')
             alert('Problem creating user, check console')
         })
 }
 



    
  return (
    <main className='register_form'>
            <form className='register_form' onSubmit={submitHandler}>
        <h1>Sign Up</h1>
    <input
     type='text'
     placeholder='username'
     value={username}
     onChange={e => setUsername(e.target.value)}
    className='form-input'/>     
    <input
     type='password'
     placeholder='password'
     value={password}
     onChange={e => setPassword(e.target.value)}
    className='form-input'/>
    <input
     type='email'
     placeholder='email'
     value={email}
     onChange={e => setEmail(e.target.value)}
    className='form-input'/>
    <input
     type='phoneNumber'
     placeholder='phone number'
     value={phoneNumber}
     onChange={e => setPhoneNumber(e.target.value)}
    className='form-input'/>
     <input
     type='legalName'
     placeholder='legal name'
     value={legalName}
     onChange={e => setLegalName(e.target.value)}
    className='form-input'/>
     <input
     type='accountType'
     placeholder='account type'
     value={accountType}
     onChange={e => setAccountType(e.target.value)}
    className='form-input'/>
    <button className='form-btn'>
        Register User
    </button>
</form>
       </main>
  )
}

export default Register;