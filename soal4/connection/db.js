const mysql = require('mysql2')

const connectionPool = mysql.createPool({
    host:'127.0.0.1',
    user:'root',
    password:'',
    database:'indonesia'
})

module.exports = connectionPool