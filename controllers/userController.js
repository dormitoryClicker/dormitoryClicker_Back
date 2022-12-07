const user = require("../models/userModel.js");
const db = require('../models/db.js');

module.exports = {
    showUserInfo: (req, res) => {
        console.log('userId:', req.body.userId);
        const userId = req.body.userId;

        user.findOne(userId)
        .then(() => {
            user.selectUserInfo(userId, (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).send(
                        'Server Unavailable'
                    )
                }
                else
                    res.send(result);
            })
        })
        .catch((err) => {
            console.log(err);
            if(err.message === 'not-exist') {
                res.status(404).send(
                    `Not found userId with ${req.body.userId}`
                )
            }
            else {
                res.status(500).send(
                    'Server Unavailable'
                )
            }
        })
    },

    changeDormitory: async (req, res) => {
        var userId = req.body.userId;
        var dormitory = req.body.dormitory;

        user.findOne(userId)
            .then(() => {
                mydb.query("SELECT DISTINCT dormitory FROM machine", (err, result) => {
                    if (err) {
                        console.log("error : ", err);
                        res.status(500).send(
                            `Server Unavailable`
                        )
                    }
                    else if (!result.filter(m => m.dormitory === dormitory).length) {
                        res.status(404).send(
                            `Not found dormitory with ${req.body.dormitory}`
                        )
                    }
                    else {
                        user.updateDormitory(userId, dormitory, (err, result) => {
                            if (err) {
                                console.log(err);
                                res.status(500).send(
                                    `Server Unavailable`
                                )
                            }
                            res.send(result);
                        })
                    }
                })
            })
            .catch((err) => {
                console.log(err);
                if (err.message === 'not-exist') {
                    res.status(404).send(
                        `Not found userId with ${req.body.userId}`
                    )
                }
                else {
                    res.status(500).send(
                        'Server Unavailable'
                    )
                }
            })
    },

    doSignIn: async function (req, res) {

        let userId = req.body.userId;
        let password = req.body.password;

        try {
            let result = await user.checkUser(userId, password);
            if (result.length != 1) {
                res.send("failed");
            }
            else {
                res.send("success");
            }
        }
        catch (e) {
            res.send(e);
        }

    },

    doSignUp: async function (req, res) {

        let userId = req.body.userId;
        let password = req.body.password;
        let userName = req.body.userName;
        let dormitory = req.body.dormitory;

        if ((userId == undefined) || (password == undefined) || (userName == undefined) || (dormitory == undefined)) {
            res.send("Bad request");
            return;
        }

        try {
            //아이디 중복 확인
            let result = await user.checkDuplicationID(userId);
            if (result.length != 0) {
                res.send("Id exists");
            }
            else {
                //회원가입
                await user.insertUser(userId, password, userName, dormitory);
                res.send("success");
            }
        }
        catch (e) {
            res.send(e);
        }

    },

    resetReservation: async function () {
        
        try {
            let result = await user.overtimeUser();
            db.beginTransaction(async (err) => {
                    if (err)
                        return
                    result.map(async (item) => {
                        await user.updateCanReservation_1(item.userId).catch(e => {
                            db.commit((err) => {
                                if (err) {
                                    return db.rollback(() => {
                                        console.log(err);
                                    })
                                }
                            })
                        });
                    })

                    db.commit((err) => {
                        if (err) {
                            return db.rollback(() => {
                                console.log(err);
                            })
                        }
                    })

                })
        }
        catch (e) {
            console.log(e);
        }

    }
}