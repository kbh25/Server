const mysql = require('mysql');

const connection = mysql.createConnection({
    host : 'sql7.freesqldatabase.com',
    database : 'sql7615343',
    user : 'sql7615343',
    password : 'syttLxdz6K'

});

connection.connect(function(error){
    if(error){
        throw error;

    }
    else{
        console.log('MySQL Database is connected Succefully!!!');
    }

});
module.exports = connection;

