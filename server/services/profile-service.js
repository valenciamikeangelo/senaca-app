var seneca     = require('seneca')()

var mongoose = require('mongoose');

require('../models/Profiles');
mongoose.connect('mongodb://localhost/wisapp');

seneca
  .use('../api/profile-api')
  .listen(10202)
  

