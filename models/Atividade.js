const { DataTypes } = require('sequelize')
const db = require('../db/conn.js')

const Atividade = db.define('atividade',{
    codigo : {
        type : DataTypes.INTEGER
    },
    nome : {
        type : DataTypes.STRING(255)
    },
},{
    createdAt : false,
    updatedAt : false
})

// Atividade.sync({force:true})

module.exports = Atividade