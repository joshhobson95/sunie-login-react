//sets up specifics of the database for Sequelize
//dialectOptions can be configured for SSL, took them out for ease of access when building

require('dotenv').config()
const {CONNECTION_STRING} = process.env
const Sequelize = require('sequelize')

const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'mysql', 
    dialectOptions: {} 
})

module.exports = {
    sequelize
}
