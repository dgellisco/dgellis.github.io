// dependencies
var orm = require("../config/orm.js");

// craete the code that will call the ORM functions using
// burger specific input for the ORM

var burger = {
    selectAll: function (cb) {
        orm.selectAll(function (res) {
            cb(res);
        });
    },
    insertOne: function (burger, cb) {
        orm.insertOne(burger, function (res) {
            cb(res);
        });
    },
    updateOne: function (condition, cb) {
        orm.updateOne(condition, function (res) {
            cb (res);
        });
    }
};

// export for use by controller (how MVC communicates between model [db] and view [UI])
module.exports = burger;