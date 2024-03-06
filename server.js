const express = require("express");
const articleRouter = require("./routers/articles")
const Article = require("./models/article")
const mongoose = require("mongoose");
const metodOverride = require( "method-override" );

const app = express()
mongoose.connect('mongodb://localhost:27017/bharatInterDatabase')


app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))
app.use(metodOverride("_method"))  //for delete request on form
app.get('/', async(req,res)=>{
    const articles = await Article.find().sort({createdAt:"desc"})
    res.render("articles/index",{articles:articles})
})

app.use("/articles", articleRouter)
app.listen(3000)