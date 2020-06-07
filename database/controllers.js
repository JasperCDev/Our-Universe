const { GlobalTotal, User } = require('./models');


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


const getUser = (userName, cb) => {
  User.findOne({username: userName}, (err, user) => {
    if (err) {
      cb(err);
    } else {
      cb(null, user);
    }
  });
}

const createUser = (userName, cb) => {
  User.findOne({username: userName}, (err, user) => {
    if (err) {
      cb(err);
    } else {
      if (user === null) {
        User.create({username: userName, total: 0}, (err2, result) => {
          if (err2) {
            cb(err2);
          } else {
            cb(null, `user ${userName} created!!`);
          }
        });
      } else {
        cb(null, `user ${userName} already exists!`);
      }
    }
  });
}


module.exports = {
  getGlobalTotal,
  updateGlobalTotal,
  getUser,
  createUser,
}
