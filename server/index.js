//Main server File, imports all function from controller files. 
//imports models if needed
//Can set table/model relations in this file like- User.hasMany.Accounts. <--(Sequelize Syntax)
//Defines endpoints for requests

//imports
require('dotenv').config();
const {sequelize} = require('./util/database')
const {SERVER_PORT} = process.env

//cors and express config
const express = require('express')
const cors = require('cors')


//importing controller functions
const {register, login, getUsers} = require('./controllers/auth')

const passwordResetRequest = require('./controllers/passwordResetRequest')
const updatePassword = require('./controllers/updatePassword')

const usernameResetRequest = require('./controllers/usernameResetRequest')
const updateUsername = require('./controllers/updateUsername')

const {registerPotentialUser, getPotentialUsers, sendsNewUserEmail, deletePotentialUser} = require('./controllers/potentialuser')

//express and cors config so you can shorthand with app.(type of request)
const app = express();
app.use(express.json())
app.use(cors())

//endpoints for auth.js
app.get('/getusers', getUsers)
app.post('/register', register)
app.post('/emailuser', sendsNewUserEmail)
app.post('/login', login)

//endpoints for password reset
app.post('/password_reset', passwordResetRequest)
app.post('/new_password:passwordToken', updatePassword)

//endpoints for username reset
app.post('/username_reset', usernameResetRequest)
app.post('/new_username:usernameToken', updateUsername)

//endpoints for potential user registry
app.get('/getpotentialusers', getPotentialUsers)
app.post('/registerpotentialuser', registerPotentialUser)
app.delete('/deletepotentialuser/:id', deletePotentialUser)





//server running
sequelize.sync()
.then(() => {
app.listen(SERVER_PORT, () => console.log(`db sync successful & server running on port ${SERVER_PORT}`))})
.catch(err => console.log(err))