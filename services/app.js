const bodyParser = require("body-parser");
const { options } = require("superagent");

const dbName = "HariDb"




module.exports.login = async (options) => {
    return new Promise(async (resolve, reject) => {
        options.mDbClient.connect(async (err, client) => {
            console.log("Connected successfully to  mdb server");
            var body = options.body
            console.log("body", body)
            try {
                var db = client.db("HariDb");
                var query = { userName: body.userName };
                db.collection("user's").find(query).toArray(function (err, result) {
                    if (err) throw err
                    let responseObj={
                        result:"success",
                        status:200,
                        data:{}
                    }
                    console.log("result",result);
                    if(result.length>0){
                    if (result[0].password == body.password) {
                        responseObj.data=result[0]
                        resolve({
                            response: responseObj,
                            status: 200
                        })
                    } else {
                        responseObj.result="invalid password";
                        responseObj.data={}
                        responseObj.status=400;
                        resolve({
                            response: responseObj,
                            status: 200
                        })
                    }
                }else{
                    responseObj.result="user does not exist";
                    responseObj.status=400;
                    resolve({
                        response: responseObj,
                        status: 200
                    })
                }
                });
            }
            catch (e) {
                reject({
                    response: e,
                    status: 400
                })
            }
        });
    })
}


module.exports.getAllPrograms=async (options)=>{
    return new Promise(async (resolve, reject) => {
                options.mDbClient.connect(async (err, client) => {
                    console.log("Connected successfully to  mdb server");
                    try {
                        var db = client.db(dbName);
                        db.collection("fitness-programs").find({}).toArray(function (err, result) {
                            if (err) throw err
                            if (result) {
                                resolve({
                                    response: result,
                                    status: 200
                                })
                            }
                        });
                    }
                    catch (e) {
                        reject({
                            response: e,
                            status: 400
                        })
                    }
                });
            })
        }

        module.exports.getAllEnrollments=async (options)=>{
            return new Promise(async (resolve, reject) => {
                        options.mDbClient.connect(async (err, client) => {
                            console.log("Connected successfully to  mdb server");
                            try {
                                var db = client.db(dbName);
                                let myquery = { userName: options.userName };
                                db.collection("user's").find(myquery).toArray(function (err, result) {
                                    if (err) throw err
                                    if (result) {
                                        resolve({
                                            response: result[0].coursesEnrolled,
                                            status: 200
                                        })
                                    }
                                });
                            }
                            catch (e) {
                                reject({
                                    response: e,
                                    status: 400
                                })
                            }
                        });
                    })
                }
        

    module.exports.putEnrollments=async (options)=>{
        return new Promise(async (resolve, reject) => {
            options.mDbClient.connect(async (err, client) => {
                console.log("Connected successfully to  mdb server");
                try {
                    var db = client.db(dbName);
                    let myquery = { userName: options.userName };
                     let newvalues =  {$push: {coursesEnrolled: {$each: options.body}}};
                     console.log("options.body",options.body)
                    db.collection("user's").updateOne(myquery, newvalues, function (err, res) {
                        console.log("")
                        if (res.result.n > 0) {
                          resolve({
                            response: "updated sucessfully",
                            status: 200
                            })
                        } else {
                          reject({
                            response: "Failed updation",
                            status: 400
                            })
                         }
                    })
                }
                catch (e) {
                    reject({
                        response: e,
                        status: 400
                    })
                }
            });
        })
    }


