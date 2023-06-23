//Root of the project, page a b and c are in progress but architecture is here to only allow access to certain account types
import { Provider } from 'react-redux';
import store from './store/store'
import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import  AuthContext  from './store/authcontext';
import Pagea from './components/Pages/Pagea';
import Pageb from './components/Pages/Pageb'
import Pagec from './components/Pages/Pagec'
import Login from './components/Login/Login';
import UpdatePassword from './components/ForgotPassword/UpdatePassword';
import UpdateUsername from './components/ForgotUsername/UpdateUsername';
import PasswordRecoveryForm from './components/ForgotPassword/PasswordRecoveryForm';
import UsernameRecoveryForm from './components/ForgotUsername/UsernameRecoveryForm';
import RequestAccount from './components/RequestAccount/RequestAccount';
import Profile from './components/Profile/Profile';
import Home from './components/Home';
import Admin from './components/AdminPage/Admin';

function App() {
  const authCtx = useContext(AuthContext);


  return (
    <Provider store={store}>
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/passwordrecovery' element={<PasswordRecoveryForm/>} />
        <Route path='/usernamerecovery' element={<UsernameRecoveryForm/>} />
        <Route path='/requestaccount' element={<RequestAccount/>} />
        <Route path='/passwordreset/:passwordToken' element={<UpdatePassword/>} />
        <Route path='/usernamereset/:usernameToken' element={<UpdateUsername/>} />
        <Route path="/login" element={!authCtx.jwtToken ? <Login/> : <Navigate to='/profile'/>}  />
        <Route path='/profile' element={authCtx.jwtToken ? <Profile /> : <Navigate to='/login'/>}/>
        <Route
          path="/a"
          element={
            authCtx.jwtToken && authCtx.accountType === 'typeA' ? (
              <Pagea />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/b"
          element={
            authCtx.jwtToken && authCtx.accountType === 'typeB' ? (
              <Pageb />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/c"
          element={
            authCtx.jwtToken && authCtx.accountType === 'typeC' ? (
              <Pagec />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/admin"
          element={
           authCtx.jwtToken && authCtx.accountType === 'admin' ? (
              <Admin />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </div>
    </Provider>
  );
}

export default App;
