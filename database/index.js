const mongoose = require('mongoose');


mongoose.connect('mongodb://ds055565.mlab.com:55565/heroku_3kqnt9zm', {useNewUrlParser: true});


const db = mongoose.connection;


db.on('error', () => {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('Connected to MongoDB!');
});


