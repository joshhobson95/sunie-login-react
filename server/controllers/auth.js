//This controller file handles login and register functions.
require("dotenv").config();
const {User} = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {SECRET} = process.env



const createToken = (username, id) => {
    return jwt.sign(
        {
            username,
            id
        },
        SECRET,
        { 
            expiresIn: '23 hours' 
        }
    )
}

//resgister function

module.exports = {
    register: async (req, res) => {
//As of right now this will accept blank inputs for all fields. Needs to be updated to require at least username and password.
        try {
            const {username, password, email, phoneNumber, legalName, accountType} = req.body
                        
//resgister function checks for a user with that username before creating account
            let foundUser = await User.findOne({where: {username}})
            if (foundUser) {
                res.status(400).send('Username already exists')
            } else {
//if user doesnt already exist, created user, hashes password, generates userId.
                const salt = bcrypt.genSaltSync(14)
                const hash = bcrypt.hashSync(password, salt)
                const newUser = await User.create({username, hashedPass: hash, email, phoneNumber, legalName, accountType})
                const jwtToken = createToken(newUser.dataValues.username, newUser.dataValues.id)
                const exp = Date.now() + 23 * 60 * 60 * 1000
                res.status(200).send({
                    username: newUser.dataValues.username, 
                    userId: newUser.dataValues.id,
                    jwtToken,
                    exp, 
                    accountType: newUser.dataValues.accountType  
                    })
            }
        } catch (error) {
            console.log('ERROR IN register')
            console.log(error)
            res.sendStatus(400)
        }
    },

//login function    
    login: async (req, res) => {
        try {
//login only requires username and password
            const {username, password} = req.body
            let foundUser = await User.findOne({where: {username}})
            if (foundUser) {
//compares hashed password with user password to match 
                const isAuthenticated = bcrypt.compareSync(password, foundUser.hashedPass)
//logins if they match
                if (isAuthenticated) {
                    const jwtToken = createToken(foundUser.dataValues.username, foundUser.dataValues.id)
                    const exp = Date.now() + 23 * 60 * 60 * 1000
                    res.status(200).send({
                        username: foundUser.dataValues.username, 
                        userId: foundUser.dataValues.id,
                        jwtToken,
                        exp,
                        accountType: foundUser.dataValues.accountType  
                    })
                } else {
                    res.status(400).send('cannot log in')
                }
            } else {
                res.status(400).send('cannot log in')
            }
        } catch (error) {
            console.log('ERROR IN login')
            console.log(error)
            res.sendStatus(400)
        }
    },
//gets list of users and other user data
    getUsers: async (req, res) => {
        try {
            const allUsers = await  User.findAll({

            })
            res.status(200).send(allUsers)
        } catch (error) {
            console.log('ERROR IN RETRIVEING ALL USERS')
            console.log(error)
            res.sendStatus(400)
        }
    }
}