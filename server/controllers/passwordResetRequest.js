//1
//This file is also just one function. It handles the first step of resetting the password by sending an email to a user's email as long as it is assiociated with an account

const { Op } = require('sequelize');
const { User } = require('../models/user');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const express = require('express');
const router = express.Router();

//connecting and logging into 'send in blue' which is now Brevo.com
//username and password are in .env which is ignored for security reasons
const transporter = new nodemailer.createTransport({
  host: "smtp-relay.sendinblue.com",
  port: 587,
  auth: {
    user: `${process.env.BLUE_USER}`,
    pass: `${process.env.BLUE_PASSWORD}`
  }
});
//generates token for database
const generateToken = () => {
  return crypto.randomBytes(16).toString('hex');
};

//stops more than three emails per hour
const MAX_REQUESTS = 3; // Maximum number of password reset requests
const TIMEFRAME = 60 * 60 * 1000; // Timeframe in milliseconds (e.g., 1 hour)

// In-memory cache to store password reset request details
const resetRequestCache = new Map();

//sends email with token attached as the end of the URL so it can be pulled off using parameters in newPassword function

const sendPasswordResetEmail = async (email, passwordToken) => {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Password Reset Request',
    html: `Click <a href="http://localhost:3000/passwordreset/${passwordToken}">here</a> to reset your password.`,
  };
  await transporter.sendMail(mailOptions);
};

//handles password reset request
const passwordResetRequest = async (req, res) => {
  const { email } = req.body;

  // Check if the user with the given email exists in the database
  const user = await User.findOne({
    where: {
      email: {
        [Op.eq]: email,
      },
    },
  });

  // If the user doesn't exist, return an error message
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  // Check if the user has exceeded the rate limit for password reset requests
  const currentTime = Date.now();
  const userRequests = resetRequestCache.get(email) || [];
  const recentRequests = userRequests.filter(
    (timestamp) => currentTime - timestamp <= TIMEFRAME
  );
  if (recentRequests.length >= MAX_REQUESTS) {
    return res.status(429).json({ error: 'Rate limit exceeded' });
  }


  // Invokes token generation after all above checks are done
  const passwordToken = generateToken();

  // Store the password reset token in the database
  await user.update({
    passwordToken: passwordToken,
    passwordResetTokenExpiration: Date.now() + 3600000, // Token expires in 1 hour
  });

  // Update the request cache with the new request timestamp
  const updatedRequests = [...recentRequests, currentTime];
  resetRequestCache.set(email, updatedRequests);

  // Send the password reset token to the user's email address
  await sendPasswordResetEmail(email, passwordToken);

  // Return a success message
  res.status(200).json({ message: 'Password reset email sent' });
};

module.exports = passwordResetRequest;
