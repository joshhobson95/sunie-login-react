//Model for a user, these are all columns created by Sequelize for the database.

const {DataTypes} = require('sequelize')
const {sequelize} = require('../util/database')

module.exports = {
    User : sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
        }, 
          hashedPass: {
          type: DataTypes.STRING,
          allowNull: false
        },
        usernameToken: {
          type: DataTypes.STRING,
          allowNull: true
        },
        passwordToken: {
          type: DataTypes.STRING,
          allowNull: true
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
        },
        phoneNumber: DataTypes.STRING,
        legalName: DataTypes.STRING,
        accountType: DataTypes.STRING,
        createdAt:{
          type: DataTypes.DATE,
          allowNull: true
        }, 
        updatedAt:{
            type: DataTypes.DATE,
            allowNull: true
          }
    })
}
