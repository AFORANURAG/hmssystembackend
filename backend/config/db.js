const { Sequelize } = require('sequelize');
require('dotenv').config()
const cors = require('cors')
const pass=process.env.Pass
// console.log(pass)
// new Sequelize()
const sequelize = new Sequelize(process.env.dbname,process.env.dbname ,process.env.password, {
host: 'sql12.freemysqlhosting.net',
    dialect: 'mysql'
})

sequelize.authenticate().then(() => {
    console.log("Connection succesfull to db")
}).catch((err) => {
    console.log("Failed to connect to db")
    console.log(err)
})
module.exports = { sequelize }



