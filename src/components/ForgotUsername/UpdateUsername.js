
import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function UpdateUsername() {
  const [username, setUsername] = useState("");
  const [confirmUsername, setConfirmUsername] = useState("");
  const [message, setMessage] = useState("");
  const { usernameToken } = useParams(); // extract token from URL



  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleConfirmUsernameChange = (event) => {
    setConfirmUsername(event.target.value);
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    const url = 'http://localhost:5050'
    axios.post(`${url}/new_username${usernameToken}`, {username, confirmUsername })
      .then((response) => {
        setMessage(response.data.message);
        //success
        alert('Username Changed Successfully')
      })
      .catch((error) => {
        setMessage(error.response.data.message);
        //failure
        alert('Usernames did not match')
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">New Username:</label>
          <input
            type="username"
            id="username"
            name="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <label htmlFor="confirm-username">Confirm Username:</label>
          <input
            type="username"
            id="confirm-username"
            name="confirm-username"
            value={confirmUsername}
            onChange={handleConfirmUsernameChange}
          />
        </div>
        <button type="submit">Reset Username</button>
      </form>
      <div>{message}</div>
    </div>
  );
}

export default UpdateUsername;
