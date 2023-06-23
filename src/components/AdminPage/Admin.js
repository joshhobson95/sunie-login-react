import React, {useState, useEffect, useContext} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleRequestAccount } from '../../store/store'
import Register from '../Register/Register'
import axios from 'axios'
import './Admin.css'
import AuthContext from '../../store/authcontext'


//admin page for signing users up, checking list of users, and checking account Requests
function Admin() {
    const [users, setUsers] = useState([])
    const [potentialUsers, setPotentialUsers] = useState([])
    const { token } = useContext(AuthContext);


    //Redux setup for Hide and Show Request Account Page
    const showRequestAccount = useSelector(state => state.showRequestAccount);
    const dispatch = useDispatch();
  const handleToggle = () => {
    dispatch(toggleRequestAccount());
  };


    // const url = 'http://localhost:5050'
    useEffect(() => {
        axios.get('/getusers')
        .then((res) => {
           setUsers(res.data)
        })
        .catch(error => {
            console.log('ERROR', error)
        })
    }, [])

    useEffect(() => {
        axios.get('/getpotentialusers')
        .then((res) => {
           setPotentialUsers(res.data)
        })
        .catch(error => {
            console.log('ERROR', error)
        })
    }, [])

    const deletePotentialUser = (id) => {
        axios
          .delete(`/deletepotentialuser/${id}`, {
            headers: {
                authorization: token,
              },
          })
          .then(() => {
            alert('Pontential User Deleted')
          })
          .catch((err) => {
          
            console.log(err);
          });
      };
      

  return (
    <div className='admin_page'>
<div className='users_list'>
        <h1>Current Users</h1>
        {users && users.map((item) => {
            return(
                <div className='user_card'>
                <p>{item.username}</p>
                <span className='account_type'>{item.accountType}</span>
                <p>{item.legalName}</p>
                <p>{item.email}</p>
                </div>
            )
        })}
</div>
<div className='user_requests'>
        <h1>Users Requests</h1>
<div>
 <button onClick={handleToggle}>
        {showRequestAccount ? 'Hide Request Account Page' : 'Show Request Account Page'}
</button>
</div>

        {potentialUsers && potentialUsers.map((item) => {
            return(
                <div className='user_card'>
                <p>{item.username}</p>
                <p>{item.email}</p>
                <p>{item.phoneNumber}</p>
                <p>{item.legalName}</p>
                <button onClick={() => deletePotentialUser(item.id)}>Delete Potential User</button>
                </div>
            )
        })}
    
</div>
<div className='register_user'>
        <h1>Register a new User</h1>
    <Register />
</div>

    </div>
  )
}

export default Admin