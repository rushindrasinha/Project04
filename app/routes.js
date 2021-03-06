// app/routes.js


var User            = require('../app/models/user');
var request         = require('request');


module.exports = function(app, passport) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
          // if (req.user) {
          //   res.render('profile.ejs');
          // } else {
          //   res.render('index.ejs');
          // }
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });

    // process the login form
    // app.post('/login', do all our passport stuff here);
    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));


    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    // process the signup form
    // app.post('/signup', do all our passport stuff here);
    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));


    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });


    app.post('/addtoorder', function(req, res){
        console.log(req.body);
        console.log(req.body.itemToOrder.orderName);
        var restaurantName = req.body.restaurantName;
        var restaurantAddress = req.body.restaurantAddress;
        var restaurantCity = req.body.restaurantCity;
        var restaurantState = req.body.restaurantState;
        var restaurantZip = req.body.restaurantZip;
        var restaurantPhone = req.body.restaurantPhone;
        User.findByIdAndUpdate(
            {_id: req.user.id},
            {$push: {"orders": {restaurant: [restaurantName, restaurantPhone, restaurantAddress + ' ' + restaurantCity + ', ' + restaurantState + ' ' + restaurantZip], "order": [req.body.itemToOrder.orderName]}}},
            {safe: true, upsert: true, new : true},
            function(err, model) {
                if(err){console.log(err)};
            }
        );
    });

    //GET QUOTE
    app.post('/getquote', function(req, res){
        console.log(req.user.id);
        var options = {
            method: 'POST',
            url: 'https://api.postmates.com/v1/customers/cus_KKs1v70QzqvkeV/delivery_quotes',
            headers: {
                'Authorization': 'Basic MTMwYzk1MjktNzE5My00MGNhLWJhZGEtM2RiNmQxYTU5YWJmOg=='
            },
            form: {
                pickup_address: req.body.pickup_address,
                dropoff_address: req.body.dropoff_address
            }
        };
        request(options, function(err, response, body){
            res.send(body);
            console.log(body);
        });
    });


     //CONFIRM ORDER
     app.post('/confirmorder', function(req, res){
        console.log(req.user_id)

        var options = {
            method: 'POST',
            url: 'https://api.postmates.com/v1/customers/cus_KKs1v70QzqvkeV/deliveries',
            headers: {
                'Authorization': 'Basic MTMwYzk1MjktNzE5My00MGNhLWJhZGEtM2RiNmQxYTU5YWJmOg=='
            },
            form: {
                manifest: 'Team Lunch',
                pickup_address: req.body.pickup_address,
                pickup_phone_number: '555-867-5309',
                pickup_name: 'Tendergreens',
                dropoff_address: req.body.dropoff_address,
                dropoff_name: 'Dan',
                dropoff_phone_number: '555-867-5309'
            }
        }

        request(options, function(err, response, body){
            res.send(body)
        })
     });



};




// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
