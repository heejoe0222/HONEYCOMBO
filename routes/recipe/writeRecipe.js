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

module.exports = router;