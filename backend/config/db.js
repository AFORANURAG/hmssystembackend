const { Sequelize } = require('sequelize');
require('dotenv').config()
const cors = require('cors')
const pass=process.env.Pass
// console.log(pass)
const sequelize = new Sequelize("dbname", "rut", "adminpassword", {
host:"localhost",
host: '',
    dialect: 'mysql'
})

sequelize.authenticate().then(() => {
    console.log("Connection succesfull to db")
}).catch((err) => {
    console.log("Failed to connect to db")
    console.log(err)
})
module.exports = { sequelize }



