var express =require('express');
var todoController =require('./controllers/todoController');

var app=express();


app.set('view engine', 'ejs');

app.use(express.static('./public'));

// fire controller
todoController(app);


app.listen(3000);
console.log('You are listening to port 3000');

module.exports=app;