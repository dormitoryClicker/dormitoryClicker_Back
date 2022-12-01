const user = require("../models/userModel.js");
const User = require('../models/userModel.js');
const mydb = require("../models/db.js");

module.exports = {
    findInfoByUserId: (req, res) => {
        console.log('userId:', req.body.userId);
        const userId = req.body.userId;
        
        user.findByUserId(userId, (err, result) => {
            if(err) {
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
            }
            else
                res.send(result);
        })
    },

    changeDormitory: async (req, res) => {
        var userId = req.body.userId;
        var dormitory = req.body.dormitory;

        User.findOne(userId)
        .then(() => {
            mydb.query("SELECT DISTINCT dormitory FROM machine", (err, result) => {
                if(err) {
                    console.log("error : ", err);
                    res.status(500).send(
                        `Server Unavailable`
                    )
                }
                else if(!result.filter(m => m.dormitory === dormitory).length) {
                    res.status(404).send(
                        `Not found dormitory with ${req.body.dormitory}`
                    )
                }
                else {
                    User.updateDormitoryByUserId(userId, dormitory, (err, result) => {
                        if(err) {
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

    doSignIn: async function (req, res) {

        let userId = req.body.userId;
        let password = req.body.password;
    
        try {
            let result = await user.signIn(userId, password);
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

        if ((userId == undefined)||(password == undefined)||(userName == undefined)||(dormitory == undefined)) {
          res.send("Bad request");
          return;
        }
    
        try {
          //아이디 중복 확인
          let result = await user.existId(userId);
          if (result.length != 0) {
            res.send("Id exists");
          }
          else {
            //회원가입
            await user.signUp(userId, password, userName, dormitory);
            res.send("success");
          }
        }
        catch (e) {
          res.send(e);
        }
    
      }


}

// exports.findInfoByUserId = (req, res) => {
//     console.log('userId:', req.body.userId);
//     const userId = req.body.userId;
    
//     User.findByUserId(userId, (err, result) => {
//         if(err) {
//             console.log(err);
//             if(err.message === 'not-exist') {
//                 res.status(404).send({
//                     message: `Not found userId with ${req.body.userId}`
//                 })
//             }
//             else {
//                 res.status(500).send({
//                     message: 'Server Unavailable'
//                 })
                
//             }
//         }
//         else
//             res.send(result);
//     })
// };

