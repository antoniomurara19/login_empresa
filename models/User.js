const { DataTypes } = require('sequelize')
const db = require('../db/conn.js')

const User = db.define('user',{
    nome : {
        type : DataTypes.STRING(255)
    },
    email : {
        type : DataTypes.STRING(255)
    },
    senha : {
        type : DataTypes.STRING(255)
    }
},{
    createdAt : false,
    updatedAt : false
})

// User.sync({force:true})

module.exports = User