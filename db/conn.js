const { Sequelize } = require('sequelize')
const sequelize = new Sequelize('back_ind_3','root','senai',{
    host : 'localhost',
    dialect : 'mysql'
})

// sequelize.authenticate().then(()=>{
//     console.log(`Banco de dados conectado com sucesso`)
// }).catch((err)=>{
//     console.log(`Não foi possível conectar ao Banco de dados devido ao erro ${err}`)
// })

module.exports = sequelize