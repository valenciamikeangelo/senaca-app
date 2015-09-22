var seneca     = require('seneca')()

var mongoose = require('mongoose');

require('../models/Profiles');
//mongoose.connect('mongodb://localhost/wisapp');
mongoose.connect('mongodb://valenciamikeangelo:devpass@ds051843.mongolab.com:51843/wisapp');

seneca
  .use('../api/profile-api')
  .listen(10202)
  

