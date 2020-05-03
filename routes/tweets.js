var express = require("express");
var router = express.Router();
var fs = require("fs");
var path = require("path");


router.get('/bookstore', function (req,res, next){
  
  fs.readFile('./views/books.json','utf-8',(err,data)=>{
    res.render('index', {title: 'hey', message:'hello, there', bookstore: JSON.parse(data)});
  })
  
});
  

/* GET tweets files listing. */
router.get("/", (req, res, next) => {
  let fileNames = [];

  const directoryPath = path.join(__dirname, "../data");
  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      return console.log("Unable to scan directory: " + err);
    }
    files.forEach(function (file) {
      fileNames.push(file);
    });

    res.send(`the folder contains ${fileNames.toString()}`);
  });
});

// create a file and append content
router.post("/", (req, res, next) => {
  let filename = Math.floor(new Date().valueOf() * Math.random());
  fs.appendFile(`./data/${filename}.txt`, req.body.content, (err) => {
    if (err) throw err;
    res.send(`the ${req.body.content} was added to the file`);
  });
});

// update a specific file
router.put("/", (req, res, next) => {
  fs.writeFile(`./data/${req.body.filename}.txt`, req.body.content, (err) => {
    if (err) throw "the file failed to update";
    res.send(`the ${req.body.content} was updated to ${req.body.filename} the file`);
  });
});

// delete a specific file
router.delete("/:id", function (req, res, next) {
  fs.unlink(`./data/${req.params.id}.txt`, (err) => {
    if (err) throw "file does not exist";
    res.send(`file ${req.params.id}.txt was deleted successfully`);
  });
});




module.exports = router;
