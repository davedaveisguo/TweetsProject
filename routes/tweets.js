var express = require('express');
var router = express.Router();



const tweets=[
    {content: "message1"},
    {content: "message2"}
]

/* GET tweets home page. */
router.get('/', function(req, res, next) {
    res.send(`repond with the name ${JSON.stringify(tweets)}`)
});

// post sth on the tweets
router.post('/', (req,res,next)=>{
    tweets.push(req.body.content)
    res.send(`content after added is ${JSON.stringify(tweets)}`)
});


// delete a specific file
router.delete('/:id', (req,res,next)=>{
    res.send(`response with a delete resource for ${req.params.id}  deleted`)
})

module.exports = router;