var express = require('express')
var router = express.Router()
var path = require('path')
var mysql = require('mysql')
// if change for server version, use dbCo
// config.remoteOption
var dbConfig = require(path.join(__dirname, '../dbConnect')).dbConfig.localOption
var conn = mysql.createConnection(dbConfig)

router.get('/', function (req, res) {
    var id = req.user
    // if(!id) {
    //     res.render('log-sess/login.ejs')
    // }else {
    //     res.render('recipeView/writeRecipe.ejs', {"logged" : true, "ID" : id})
    // }
    var writeRecipeData = {}

    if (!id) {
        writeRecipeData.isLoggedin = false;
        res.render('log-sess/login.ejs')
    } else {
        writeRecipeData.isLoggedin = true;
        writeRecipeData.userID = id;
    }
    writeRecipeData.items = {}

    var defaultQuery = function (callback) {
        var allProdQuery = 'select ITEMNAME as itemName, ITEMPRICE as itemPrice, IMGFILENAME as imgPath from PRODUCT'
        var rowsList = []
        conn.query(allProdQuery, function (err, rows, fields) {
            if (err) throw err;
            if (rows.length) {
                for(var i = 0; i < rows.length; i++) {
                    rowsList.push(rows[i])
                }
                writeRecipeData.items = rowsList
            } else {
                writeRecipeData.items = ""
            }
            callback(null, writeRecipeData)
        })
    }
    defaultQuery(function (err, writeRecipeData) {
        if (err) {
            throw err;
            console.log('err in default write Recipe page')
        } else {
            console.log(writeRecipeData)
            res.render('recipeView/writeRecipe.ejs', writeRecipeData)
        }
    })
})

router.post('/postRecipe', function(req, res) {
    var id = req.user
    var title = req.body.title;
    var tagContents = req.body.tagcontents // #xx#xx 사용한 재료
    var usedItemList = tagContents.split('#')
    usedItemList.shift()

    var difficulty = req.body.difficulty
    var totalTime = req.body.totaltime
    // get youtube id using regular expression
    var youtubeRegexp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i;
    var videoUrl = req.body.videoUrl.match(youtubeRegexp)[1]
    var imgUrl = req.body.imgUrl

    var contentList = {}
    contentList.content1 = req.body.content1
    contentList.content2 = req.body.content2
    contentList.content3 = req.body.content3
    contentList.content4 = req.body.content4
    contentList.content5 = req.body.content5

    var writeRecipeContent = {}

    var postQuery = function (callback) {
        var recipeCheckQuery = 'select TITLE from recipe where TITLE = ?';
        conn.query(recipeCheckQuery, [title], function (err, rows, fields) {
            if (err) return callback(err);
            if (rows.length) {
                // 제목이 같은 레시피가 있으면 에러 메세지 띄워줘
                res.statusCode = 403
                writeRecipeContent.result = 0;
                writeRecipeContent.errMsg = "이미 존재하는 레시피 제목입니다."
            } else {
                // insert comment data and update rating!
                var getTagQuery = 'select ITEMPRICE from PRODUCT where ITEMNAME in (?)'
                var totalPrice = 0
                var secondQuery = function(callback) {
                    conn.query(getTagQuery, [usedItemList], function(err, rows2,) {
                        if(err) {
                            console.log("secondQuery err")
                            throw err;
                        }
                        if(rows2.length) {
                            for(var i = 0; i < rows2.length; i++) {
                                totalPrice += parseInt(rows2[i].ITEMPRICE);
                            }
                            writeRecipeContent.totalPrice = totalPrice;
                        }else {
                            console.log("get tag and item price calculate err")
                        }

                        var insertQuery = 'INSERT INTO RECIPE ' +
                            '(TITLE, USERID, IMGFILENAME, TAGCONTENTS, TOTALTIME, TOTALPRICE, DIFFICULTY, content1, content2, content3, content4, content5, VIDEOURL) ' +
                            'values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
                        var params = [title, id, imgUrl, tagContents, totalTime, totalPrice, difficulty, contentList.content1, contentList.content2, contentList.content3, contentList.content4, contentList.content5, videoUrl]

                        var thirdQuery = function(callback) {
                            conn.query(insertQuery, params, function(err, rows3, fields) {
                                console.log("query call success")
                                if (rows.affectedRows > 0) {
                                    res.statusCode = 200
                                    writeRecipeContent.result = 1
                                    writeRecipeContent.title = title
                                } else {
                                    res.statusCode = 204
                                    writeRecipeContent.result = 0
                                }
                            })
                            callback(null, writeRecipeContent)
                        }
                        thirdQuery(function(err, writeRecipeContent) {
                            if(err) console.log("write recipe third query error")
                            else {
                                var redirectPath = '/recipe/detailRecipe/viewDetail/' + title
                                console.log("redirect page to " + redirectPath)
                                res.json(writeRecipeContent)
                                // res.redirect(redirectPath)
                            }
                        })
                    })
                }
                secondQuery(function(err, writeRecipeContent) {
                    if(err) console.log("write recipe's second query error");
                    else {
                        console.log("success insert")
                    }
                })
            }
            // callback(null, writeComment);
        });
    };
    // callback query result for ejs rendering
    postQuery(function (err, writeRecipeContent) {
        if (err) console.log("Database error!");
        else {
            console.log(writeRecipeContent)
        }
    });
})
module.exports = router;