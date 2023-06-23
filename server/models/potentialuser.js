//Model for a POTENTIAL user, these are all columns created by Sequelize for the database.
//Potential users have no login capabilities, this only serves their information to the admin for consideration

const {DataTypes} = require('sequelize')
const {sequelize} = require('../util/database')

module.exports = {
    PotentialUser : sequelize.define('potentialuser', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
        },
        phoneNumber: {
         type: DataTypes.STRING,
         allowNull: false
        },
        legalName: {
          type: DataTypes.STRING,
          allowNull: false
        },
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
