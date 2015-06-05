// server.js
// 
// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var configDB = require('./config/database.js');
var stripe = require('stripe')('sk_test_Hyqjwh33yB8LVxIrYoLWtBLY');

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms
app.use('/public', express.static(__dirname + '/public'));

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);

// Stripe Payments
app.post('/charge', function(req, res) {
    var stripeToken = req.body.stripeToken;
    // var amount = idk;

    stripe.charges.create({
        source: stripeToken,
        currency: 'usd',
        amount: 2000,
        description: "Bite Me Order"
    },
    function(err, charge) {
        if (err) {
            console.log(err);
            res.send(500, err);
        } else {
            console.log(err);
            res.send(204);
        }
    });
});

app.use(express.static(__dirname));
app.listen(process.env.PORT || 3000);
