import {useState, useContext} from 'react'
import axios from 'axios'
import AuthContext from '../../store/authcontext'
import './Login.css'
import { NavLink } from 'react-router-dom'


function Login() {
const [username, setUsername] = useState('')
const [password, setPassword] = useState('')
const [email, setEmail] = useState('')
const [phoneNumber, setPhoneNumber] = useState('')
const [legalName, setLegalName] = useState('')
const [accountType, setAccountType]= useState('')

const authCtx = useContext(AuthContext);

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
     axios.post(`${url}/login`, body)
         .then((res) => {
             authCtx.login(res.data.jwtToken, res.data.exp, res.data.userId, res.data.accountType)
            alert('Success!')
         })
         .catch(error => {
             setUsername('')
             setPassword('')
             setEmail('')
             setPhoneNumber('')
             setLegalName('')
             setAccountType('')
             console.log('ERROR')
             alert('Incorrect Username or Password')
         })
 }
 



    
  return (
    <main className='loginform'>
            <form className='form-auth-form' onSubmit={submitHandler}>
                <h1>Login</h1>
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
            <button className='form-btn'>
                Login
            </button>
        </form>

<div className='login_bottom'>
        <NavLink to='/requestaccount' className='request'>
                <span>Request an Account</span>
            </NavLink>
            <NavLink to='/passwordrecovery'>
                <span>Forgot Your Password?</span>
            </NavLink>
            <NavLink to='/usernamerecovery'>
                <span>Forgot Your Username?</span>
            </NavLink>
</div>

        
       </main>
  )
}

export default Login;