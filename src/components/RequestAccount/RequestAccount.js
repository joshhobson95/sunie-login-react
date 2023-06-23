import {useState} from 'react'
import axios from 'axios'
import './RequestAccount.css'
import { useSelector } from 'react-redux';


function RequestAccount() {

      
const [username, setUsername] = useState('')
const [email, setEmail] = useState('')
const [phoneNumber, setPhoneNumber] = useState('')
const [legalName, setLegalName] = useState('')





const submitHandler = e => {
    e.preventDefault()
    console.log('submitHandler called')
     const body = {
         username,
         email, 
         phoneNumber,
         legalName,
     }
     const url = 'http://localhost:5050'
     axios.post(`${url}/registerpotentialuser`, body)
         .then((res) => {
            alert('Your Request for an Account has been set')
         })
         .catch(error => {
             setUsername('')
             setEmail('')
             setPhoneNumber('')
             setLegalName('')
             console.log('ERROR')
             alert('Problem Requesting Account, Please Try Again Later')
         })
 }




 //Redux set up for Request Account being turned on and off. This is what is returns when turned off
const showRequestAccount = useSelector(state => state.showRequestAccount);
if (!showRequestAccount) {
  return (
    <div>
        <h1>We are not accepting any requests for accounts right now</h1>
    </div>
  )
}
 

//This is what is returned when it is turned on.
    return (
        <main className='potential_user_register'>
                <form className='potential_user_register' onSubmit={submitHandler}>
            <h1>Request an Account from an Administrator</h1>
        <input
         type='text'
         placeholder='username'
         value={username}
         onChange={e => setUsername(e.target.value)}
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

        <button className='form-btn'>
        Request an Account
        </button>
    </form>
           </main>
      )
}

export default RequestAccount




