var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');

// Establish a db connection
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost:27017/groovyroom');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    console.log('database connected');
});

// Import route handlers
var index = require('./routes/index');
var users = require('./routes/users');

var User = require('./models/User');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret : '6170', resave : true, saveUninitialized : true }));
app.use(express.static(path.join(__dirname, 'public')));

// Authentication middleware. This function
// is called on _every_ request and populates
// the req.currentUser field with the logged-in
// user object based off the username provided
// in the session variable (accessed by the
// encrypted cookied).
app.use(function(req, res, next) {
    if (req.session.username) {
        User.findByUsername(req.session.username, 
            function(err, user) {
                if (user) {
                    req.currentUser = user;
                } else {
                    req.session.destroy();
                }
                next();
            });
    } else {
        next();
    }
});

// Map paths to imported route handlers
app.use('/', index);
app.use('/users', users);

app.listen(process.env.PORT || 3000);

module.exports = app;