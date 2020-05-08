const express=require('express');
const router=express.Router();
const Tweets=require('../models/tweets');
const Users=require('../models/users');

router.get('/users', (req,res)=>{
    Users.find({}, (err, users)=>{
        if(err) throw new Error('cannot find');
        console.log(users);
        res.status(200).json({
            message: 'find users'
        })
    })
})

router.post('/', (req,res)=>{
    const users= new Users({
        name:"test111",
        username:"moviestar",
        location:"newYorker",
        bio:"this is yuyan developer",
        avatarUrl:"/img/webdxd.png"
    });
    users.save().then(result=>{
        res.status(201).json({
            message: "user added successfully",
            postId: result._id,
        });
    })

})

router.get('/', (req,res)=>{
    Tweets.find({}, (err,tweets)=>{
        console.log(tweets);
        res.render('index', {tweets})
    })
});


router.get('/login', (req,res)=>{
    res.render('login');
});

router.get('/signup', (req,res)=>{
    res.render('signup');
});

module.exports=router;