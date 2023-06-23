//Password Recovery Form, where a user enters an email asscociated with their account to recieve password reset email

import React, { useState } from 'react';
import axios from 'axios';



function PasswordRecoveryForm() {
  const [email, setEmail] = useState('');

  //Stores email
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  //Invokes initiatePasswordRecovery function on form submit
  const handleFormSubmit = (event) => {
    event.preventDefault();
    initiatePasswordRecovery(email);
  };


//checks for user with that email, only send email if there is a user with that email in database
  const initiatePasswordRecovery = (email) => {
    const url = 'http://localhost:5050'
    axios.post( `${url}/password_reset`, { email })
      .then((response) => {
        alert('An email has been sent to your account')
      })
      .catch((error) => {
        // Handle error, e.g., show error message to the user
        console.error(error.message);
        alert('No account associated with this email')
  
          //Alerts User that over 3 emails have been sent within the hour
        if (error.message === 'Request failed with status code 429') {
          // Display rate limit exceeded message to the user
          // You can show this message in an alert, toast, or update a message on the page
          alert('Email Rate limit exceeded. Please try again after one hour.');
        }
      });
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <h4>Enter the Email asscociated with your account</h4>
      <label>
        Email:
        <input type="email" value={email} onChange={handleEmailChange} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
export default PasswordRecoveryForm;
