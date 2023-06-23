
const { Op } = require('sequelize');
const { User } = require('../models/user');
const nodemailer = require('nodemailer');
const sendinblueTransport = require('nodemailer-sendinblue-transport');
const crypto = require('crypto');
const express = require('express');
const router = express.Router();


const transporter = new nodemailer.createTransport({
  host: "smtp-relay.sendinblue.com",
  port: 587,
  auth: {
    user: `${process.env.BLUE_USER}`,
    pass: `${process.env.BLUE_PASSWORD}`
  }
});

const generateToken = () => {
  return crypto.randomBytes(16).toString('hex');
};


const MAX_REQUESTS = 3; 
const TIMEFRAME = 60 * 60 * 1000; 


const resetRequestCache = new Map();


const sendUsernameResetEmail = async (email, usernameToken) => {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Username Reset Request',
    html: `Hello. Click <a href="http://localhost:3000/usernamereset/${usernameToken}">here</a> to reset your Username.`,
  };
  await transporter.sendMail(mailOptions);
};


const usernameResetRequest = async (req, res) => {
  const { email } = req.body;


  const user = await User.findOne({
    where: {
      email: {
        [Op.eq]: email,
      },
    },
  });


  if (!user) {
    return res.status(404).json({ error: 'Email not found' });
  }

  const currentTime = Date.now();
  const userRequests = resetRequestCache.get(email) || [];
  const recentRequests = userRequests.filter(
    (timestamp) => currentTime - timestamp <= TIMEFRAME
  );
  if (recentRequests.length >= MAX_REQUESTS) {
    return res.status(429).json({ error: 'Rate limit exceeded' });
  }



  const usernameToken = generateToken();

  await user.update({
    usernameToken: usernameToken,
    usernameResetTokenExpiration: Date.now() + 3600000, 
  });


  const updatedRequests = [...recentRequests, currentTime];
  resetRequestCache.set(email, updatedRequests);

  await sendUsernameResetEmail(email, usernameToken);

  res.status(200).json({ message: 'Username reset email sent' });
};

module.exports = usernameResetRequest;
