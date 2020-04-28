var bodyParser = require('body-parser');
var mongoose =require('mongoose');

// connect to database
mongoose.connect('mongodb+srv://yuhua:123321Zxc@clustertodolist-ygcbk.mongodb.net/test?retryWrites=true&w=majority');

// create schema
var todoSchema =new mongoose.Schema({
    item: String
});

// create model
var Todo=mongoose.model('Todo',todoSchema);

var data=[{item:'get milk'}, {item:'walk milk'}, {item:'drink milk'}];
var urlencodedParser=bodyParser.urlencoded({extended:false});




module.exports=function(app){
   
    app.get('/todo', function(req,res){
        // get data from mongodb and pass it to view
        Todo.find({},function(err,data){
            if(err) throw err;
            res.render('todo',{todos: data});      
        })
    });


    app.post('/todo', urlencodedParser, function(req,res){
        // get data from view and add it to mdb
        var newTodo= Todo(req.body).save(function(err,data){
            if(err) throw err;
            res.json(data);
        })
    });


    app.delete('/todo/:item', function(req,res){
            Todo.find({item:req.params.item.replace(/\-/g, " ")}).remove(function(err,data){
                if(err) throw err;
                res.json(data);
            });


            // data.filter gonna loop thr each item in data object
            // data=data.filter(function(todo){
            //     return todo.item.replace(/ /g, "-")!==req.params.item;
            // });
            // // send back data to rerender the list
            // res.json(data);
    });



};