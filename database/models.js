const mongoose = require('mongoose');

const totalSchema = mongoose.Schema({
  id: Number,
  total: Number,
});

const GlobalTotal = mongoose.model('GlobalTotal', totalSchema);

const getGlobalTotal = (cb) => {
  GlobalTotal.findOne({}, (err, results) => {
    if (err) {
      cb(err);
    } else {
      cb(null, results);
    }
  });
}


const updateGlobalTotal = (n, cb) => {
  GlobalTotal.findOne({}, (err, results) => {
    if (err) {
      cb(err);
    } else {
      console.log(results.total);
      const newN = n + results.total;
      GlobalTotal.findOneAndUpdate({}, {total: newN}, (err, results) => {
        if (err) {
          cb(err);
        } else {
          cb(null, results);
        }
      });
    }
  });

}


module.exports = {
  GlobalTotal,
  getGlobalTotal,
  updateGlobalTotal
}
