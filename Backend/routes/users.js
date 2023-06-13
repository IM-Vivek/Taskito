const express = require("express")
const app = express.Router();
const sql = require("../Database/database.js")

app.post('/signup', function (req, res) {
    var fname = req.body.fname;
    var lname = req.body.lname;
    var email = req.body.email;
    var password = req.body.password;
    var query = "INSERT INTO `users` (`First Name`, `Last Name`, `Email`, `Password`) VALUES ('" + fname + "', '" + lname + "', '" + email + "', '" + password + "')";
    sql.query("SELECT * FROM `users` WHERE `Email` = '" + email + "'", function (err, row, field) {
        if (err) {
            res.json({
                "result": false,
                "msg": "Somthing went wrong!!!!"
            })
        } else {
            if (row.length != 0) {
                res.json({
                    "result": false,
                    "msg": "Email already registerd!!!!"
                })
            } else {
                sql.query(query, function (err, row, field) {
                    if (err) {
                        res.json({
                            "result": false,
                            "msg": "Somthing went wrong!!!!"
                        })
                    } else {
                        res.json({
                            "result": true,
                            "msg": "Account Created!!!!"
                        })
                    }
                });
            }
        }
    });
});

app.post('/login', function (req, res) {
    var email = req.body.email;
    var password = req.body.password;
    sql.query("SELECT * FROM `users` WHERE `Email` = '" + email + "'", function (err, row, field) {
        if (err) {
            res.json({
                "result": false,
                "msg": "Somthing went wrong!!!!"
            })
        } else {
            if (row.length == 0) {
                res.json({
                    "result": false,
                    "msg": "Email not registerd!!!!"
                })
            } else {
                if (row[0]["Password"] === password) {
                    res.json({
                        "result": true,
                        "data": {
                            "First Name": row[0]["First Name"],
                            "Last Name": row[0]["Last Name"],
                            "Email": row[0]["Email"],
                            "myTodo": row[0]["myTodo"],
                        }
                    })
                } else {
                    res.json({
                        "result": false,
                        "msg": "Invalid Password!!!!"
                    })
                }
            }
        }
    });
});

app.post('/update', function (req, res) {
    var myTodo = req.body.myTodo;
    var email = req.body.email;
    sql.query("UPDATE `users` SET `myTodo` = '" + myTodo + "' WHERE `users`.`Email` = '" + email + "'", function (err, row, field) {
        if (err) {
            res.json({
                "result": false,
                "msg": "Somthing went wrong!!!!"
            })
        } else {
            res.json({
                "result": true,
                "msg": "Todo updated!!!!"
            })
        }
    });
});

module.exports = app;