//This is the component that is rendered through clicking the email link. 
import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function UpdatePassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const { passwordToken } = useParams(); // extract token from URL


  //stores password from form
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
//stores confirmedPassword
  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };


  //runs after form submission, sends password and confirmPassword to backend to check if they match. if they do, you have successfully changed password. If not, error message occurs.
  const handleSubmit = (event) => {
    event.preventDefault();
    const url = 'http://localhost:5050'
    axios.post(`${url}/new_password${passwordToken}`, { password, confirmPassword })
      .then((response) => {
        setMessage(response.data.message);
        //success
        alert('Password Changed Successfully')
      })
      .catch((error) => {
        setMessage(error.response.data.message);
        //failure
        alert('Passwords did not match')
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="password">New Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div>
          <label htmlFor="confirm-password">Confirm Password:</label>
          <input
            type="password"
            id="confirm-password"
            name="confirm-password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
        </div>
        <button type="submit">Reset Password</button>
      </form>
      <div>{message}</div>
    </div>
  );
}

export default UpdatePassword;
