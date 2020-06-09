const { GlobalTotal, User } = require('./models');


const getGlobalTotal = (cb) => {
  GlobalTotal.findOne({}, (err, response) => {
    if (err) {
      cb(err);
    } else {
      if (response == null) {
        GlobalTotal.create({total: 0}, (err, user) => {
          if (err) {
            cb(err);
          } else {
            cb(null, user);
          }
        })
      }
      cb(null, response);
    }
  });
}

const updateGlobalTotal = (n, cb) => {
  GlobalTotal.findOne({}, (err, response) => {
    if (err) {
      cb(err);
    } else {
      const newN = n + response.total;
      GlobalTotal.findOneAndUpdate({}, {total: newN}, (err, response) => {
        if (err) {
          cb(err);
        } else {
          cb(null, response);
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
      if (user === null) {
        cb(null, {message: `user ${userName} does not exist`})
      } else {
        cb(null, user);
      }
    }
  });
}

const createUser = (userName, cb) => {
  User.findOne({username: userName}, (err, user) => {
    if (err) {
      cb(err);
    } else {
      if (user === null) {
        User.create({username: userName, total: 0}, (err2, response) => {
          if (err2) {
            cb(err2);
          } else {
            cb(null, {userName: userName, message: `user ${userName} created!!`});
          }
        });
      } else {
        cb(null, {userName: null, message: `user ${userName} already exists!`});
      }
    }
  });
}

const updateUserTotal = (userName, n, cb) => {
  User.findOne({username: userName}, (err, user) => {
    if (err) {
      cb(err);
    } else {
      const newN = n + user.total;
      User.findOneAndUpdate({username: userName}, {total: newN}, (err, response) => {
        if (err) {
          cb(err);
        } else {
          cb(null, response);
        }
      });
    }
  });
}

const getTopUsers = (n, cb) => {
  User.find({}, null, {sort: {total: -1}, limit: n}, (err, response) => {
    if (err) {
      cb(err);
    } else {
      cb(null, response);
    }
  });
}


module.exports = {
  getGlobalTotal,
  updateGlobalTotal,
  getUser,
  createUser,
  updateUserTotal,
  getTopUsers,
}
