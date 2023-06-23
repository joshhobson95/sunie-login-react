//handle all functions for potential users
const { Op } = require('sequelize');
const { User } = require('../models/user');
const {PotentialUser} = require('../models/potentialuser')
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const express = require('express');
require("dotenv").config();




//creates a potential user

module.exports = {
    registerPotentialUser: async (req, res) => {

        try {
            const {username, email, phoneNumber, legalName} = req.body

            let foundPotentialUser = await PotentialUser.findOne({where: {username}})
            if (foundPotentialUser) {
                res.status(400).send('Username already exists')
            } else {
                const newPotentialUser = await PotentialUser.create({username, email, phoneNumber, legalName})
                res.status(200).send({
                    username: newPotentialUser.dataValues.username, 
                    userId: newPotentialUser.dataValues.id,
                    })
            }
        } catch (error) {
            console.log('ERROR IN register')
            console.log(error)
            res.sendStatus(400)
        }
    },

    //gets all potential users in database

    getPotentialUsers: async (req, res) => {
        try {
            const allPotentialUsers = await  PotentialUser.findAll({

            })
            res.status(200).send(allPotentialUsers)
        } catch (error) {
            console.log('ERROR IN RETRIVEING ALL potential USERS')
            console.log(error)
            res.sendStatus(400)
        }
    },

    //deletes pontential useres off the list

    deletePotentialUser: async (req, res) => {
        try {
            const {id} = req.params
            await PotentialUser.destroy({where: {id: +id}})
            res.sendStatus(200)
        } catch (error) {
            console.log('ERROR IN DELETE SALES POST')
            console.log(error)
            res.sendStatus(400)
        }
    },

    //not directly part of the potnential users table, but was part of the same process
    //Sends an email to a new user automatically after an admin signs them up for a User Account

    sendsNewUserEmail: async (req, res) => {
        try {

            const {username, password, email, phoneNumber, legalName, accountType} = req.body
            let foundUser = await User.findOne({where: {username}})
            if (foundUser) {
                res.status(400).send('Username already exists did not send email')
            } else {

                const transporter = new nodemailer.createTransport({
                    host: "smtp-relay.sendinblue.com",
                    port: 587,
                    auth: {
                      user: `${process.env.BLUE_USER}`,
                      pass: `${process.env.BLUE_PASSWORD}`
                    }
                  })
                  const sendUserEmail = async () => {
                    const mailOptions = {
                      from: process.env.EMAIL_FROM,
                      to: email,
                      subject: 'Your Account has been created',
                      html: `Congrats! Your Account has been created. 
                      Here is your account information:
                        Email: ${email}
                        Username: ${username}
                        Temporary Password: ${password}
                        Phone Number: ${phoneNumber}
                        Legal Name: ${legalName}
                        Account Type: ${accountType}
                      `,
                    };
                    await transporter.sendMail(mailOptions);
         
            }
            sendUserEmail()

                            }
                        } catch (error) {
                            console.log('ERROR IN register')
                            console.log(error)
                            res.sendStatus(400)
                        }
                    }

      
}


