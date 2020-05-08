const express=require('express');
const app =express();
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require("path");
const tweets =require('./tweets.json');
app.locals.moment = require('moment');
const mongoose =require('mongoose');

const index=require('./routes/index');
const profile=require('./routes/profile');

mongoose.connect('mongodb://localhost:27017/webdxd',{ useNewUrlParser: true,  useUnifiedTopology: true} )
.then(()=>{
    console.log('connected to db')
})
.catch(()=>{
    console.log('connection failed')
})

// pug views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//  resolve the static image cannot display
app.use(express.static('public')); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(logger('dev'));


app.use('/', index);
app.use('/profile', profile);





app.use((req,res,next)=>{
    const err= new Error('Page Not Found');
    err.status=404;
    next(err);
})


//  error handling middleware
app.use((err,req,res,next)=>{
    res.send(err.message);
});



app.listen(3000, ()=>{console.log('listening port 3000')});