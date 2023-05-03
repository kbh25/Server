
var express = require('express');
var router = express.Router();

var database = require('../database');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', session : req.session });
});

router.post('/login', function(request, response, next){

    var user_email_address = request.body.user_email_address;

    var user_password = request.body.user_password;

    if(user_email_address && user_password)
    {
        query = `
        Insert INTO register 
        WHERE Email = "${user_email_address}"
        `;

        database.query(query, function(error, data){

            if(data.length > 0)
            {
                for(var count = 0; count < data.length; count++)
                {
                    if(data[count].user_password == Password)
                    {
                        request.session.user_id = data[count].user_id;

                        response.redirect("/");
                    }
                    else
                    {
                        response.send('Incorrect Password');
                    }
                }
            }
            else
            {
                response.send('Incorrect Email Address');
            }
            response.end();
        });
    }
    else
    {
        response.send('Please Enter Email Address and Password Details');
        response.end();
    }

});

router.get('/logout', function(request, response, next){

    request.session.destroy();

    response.redirect("/");

});

router.post('/register', function(request, response, next){

    var FirstName = request.body.FirstName;
    var LastName = request.body.LastName;
    var PhoneNumber = request.body.PhoneNumber;
    var Email = request.body.Email;
    var Password = request.body.FirstName;
    var DOB = request.body.DOB;
    var Gender = request.body.Gender;
    var Balance = request.body.Balance;


    if(FirstName && LastName && PhoneNumber && Email && Password && DOB && Gender)
    {
        /*var query = 
        'INSERT INTO register (FirstName, LastName, PhoneNumber, Email, Password, DOB, Gender) VALUES ("${first_Name}","${LastName}", "${PhoneNumber}", "${Email}", "${Password}", "${DOB}", "${Gender};")';
          */
        var query = ` Insert INTO register (FirstName, LastName, PhoneNumber, Email, Password, DOB, Gender) VALUES ("${First_Name}", "${LastName}" , "${PhoneNumber}" , "${Email}" , "${Password}" , "${DOB}", "${Gender}")`;
        database.query(query,function(error,data){

            if(error){
                throw error;
            }
            else{
                response.redirect("/home.ejs");
            }
        });
    }
    });
/*      check if upper syntax or this one
  connection.query(sql, [firstname, lastname, password, email, dateOfBirth, balance, gender], (error, result) => {
    if (error) {
      console.error('Error inserting user into MySQL database:', error);
      response.status(500).json({ error: 'Internal server error' });
    } else {
      console.log('User registered:', result);
      response.status(200).json({ message: 'User registered successfully' });
    }
  });




}*/

    


module.exports = router;
