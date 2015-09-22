var express    = require('express')
var bodyParser = require('body-parser')
var seneca     = require('seneca')()
var passport = require('passport');
var mongoose = require('mongoose');


require('../models/Users');
require('../config/passport');

mongoose.connect('mongodb://valenciamikeangelo:devpass@ds051843.mongolab.com:51843/wisapp');
//mongoose.connect('mongodb://localhost/wisapp');
seneca.client({host: "localhost",port:10202,pin:{role:"profile",cmd:"*"}})

require('./web/seneca-commands')(seneca);
require('./web/routes')(seneca);

var app = express()
app.use(passport.initialize());
app.use( bodyParser.json() )
app.use( seneca.export('web') )
app.use( express.static('../client') )

app.listen(3000)
