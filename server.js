const express = require("express")
const app = express()
const path = require('path')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const mongoose = require('mongoose')
const dbConnection = require('./config/dbConnect')
const cookieParser = require('cookie-parser')
// const verifyJWT = require('./middleware/verifyJWT')
dbConnection();
const PORT = process.env.PORT || 4000;

app.use(cors(corsOptions))
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cookieParser())
app.use(express.static(path.join(__dirname,'public')))
app.use((req, res, next) => {
  console.log("Origin:", req.headers.origin, "| URL:", req.url);
  next();
});

app.use('/users',require('./routes/userRegistrationRoute'))
app.use('/auth',require('./routes/userAuthenticationRoute'))
app.use('/refresh',require('./routes/userRefreshRoute'))
app.use('/logout',require('./routes/userLogoutRoute'))
// app.use(verifyJWT)
app.use('/post',require('./routes/userPostRouter'))
// app.get(/^(\/|\/index(\.html)?)$/,(req,res)=>{
//     res.sendFile(path.join(__dirname,'views','index.html'))
// })

app.get(/^\/$|\/index(\.html)?$/,(req,res)=>{
    res.status(200).sendFile(path.join(__dirname,'views','index.html'))
})

app.get(/^\/old-page(.html)?$/,(req,res)=>{
    // res.sendFile(path.join(__dirname,'views','new-page.html'))
    res.redirect(301,'/new-page.html')
})

app.get(/\/new-page(\.html)?$/,(req,res)=>{
    res.status(200).sendFile(path.join(__dirname,'views','new-page.html'))
})

const one = (req,res,next) => {
    console.log("one")
    next()
}

const two = (req,res,next) => {
    console.log("two")
    next()
}

const three = (req,res) => {
    console.log("three")
    res.send("Three all worked")
}
//
app.get('/hello.html',[one,two,three])

app.all(/.*/, (req, res) => {
  res.status(404)

  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'))
  } else if (req.accepts('json')) {
    res.json({ error: "404 not found" })
  } else {
    res.type('txt').send("404 not found")
  }
})

app.use((err,req,res,next)=>{
    console.log(err.message)
    res.status(500).send(err.message)
    next();
})

mongoose.connection.once('open',()=>{
    console.log('DB connected')
    app.listen(PORT,()=>console.log(`Server starts on ${PORT}`));

})
