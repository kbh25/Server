
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
        var query = ` Insert INTO register (FirstName, LastName, PhoneNumber, Email, Password, DOB, Gender) VALUES ("${First_Name}", "${LastName}" , "${PhoneNumber}" , "${Email}" , "${Password}" , "${DOB}", "${Gender}")`;
        database.query(query,function(error,data){
           
            if(error){
                throw error;
            }
            else{
                response.json(FirstName);
                response.json(LastName);
                response.json(PhoneNumber);
                response.json(Email);
                response.json(Password);
                response.json(DOB);
                response.json(Gender);
            }
            
        }); 
    }
    });
    router.post('/reserve', function(request, response, next){

        var res_Date = request.body.res_Date;
        var res_Time = request.body.res_Time;
        var Duration = request.body.Duration;
        var vehicle_type = request.body.vehicle_type;
        var vehicle_number = request.body.vehicle_number;
        if(Date && Time && Duration && Vehicle_Type && Vehicle_Number)
        {
            var query = ` Insert INTO reservation (res_Date, res_Time, Duration, vehicle_type, vehicle_number) VALUES ("${res_Date}", "${res_Time}" , "${Duration}" , "${vehicle_type}" , "${vehicle_number}")`;
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

        // inserting money to customer table by ID

        router.post('/users/:id/funds/insert', (req, res) => {
            const userId = req.params.id;
            const amount = req.body.amount;

            var query = ` INSERT INTO register( Balance ) VALUES ( "${amount}" ) WHERE id = ("${userId}"); database.query(query,function(error,data)`
    
                if(error){
                    throw error;
                }
                else{
                    response.redirect("/home.ejs");
                }
            }); 

                // deducting money so that customer reserves with conditions

            router.post('/users/:id/funds/deduct', (req, res) => {
                const userId = req.params.id;
                const amount = req.body.amount;
                

                    connection.query( ` SELECT Balance FROM register WHERE id = ("${userId}"); `, function (error, results, fields) {
                        if (error) throw error;
                        
                        // store the column data in a variable
                        const amount = results.map(result => result.column_name);
                      
                        console.log(columnData); // output the column data to the console
                      });


                    return res.status(400).json({ error: 'Balance is zero or negative' });
                  
                var query = ` INSERT INTO register( Balance ) VALUES ( "${amount}" ) WHERE id = ("${userId}"); database.query(query,function(error,data)`
        
                    if(error){
                        throw error;
                    }
                    else{
                        response.redirect("/home.ejs");
                    }
                }); 

// code to retrieve balance of each user
router.get('/users/:id/balance', (req, res) => {
    connection.query('SELECT balance FROM register', (error, results, fields) => {
      if (error) throw error;
      const balance = results[0].balance;
      res.send(balance);
    });
  });



       
 
module.exports = router;
