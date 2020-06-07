const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/oneMillion', {useNewUrlParser: true});


const db = mongoose.connection;


db.on('error', () => {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('Connected to MongoDB!');
});


