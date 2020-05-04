const path = require('path');
const fs = require("fs");
const GenerateUUID = require("../Utils/UUID");

/**
 * create a tweet.
 * @Input  req.body.content
 * @return The content added to specific file
 */
const postHandler =(req,res,next)=>{
    const dataPath = path.join(__dirname, "../data");
    const fileId = GenerateUUID();
    console.log(fileId);
    const content ={
        id: fileId
    }
    content.content=req.body.content;
    const filePath = path.join(dataPath, `${fileId}.json` );
    const fileContent = JSON.stringify(content);
    fs.writeFile(filePath, fileContent, (err)=>{
        if(err){
            res.status(404).send('failed to create the file');
        }
    })
    res.status(200).send(`Your tweet ${fileContent} has been added to ${fileId}.json file`);
}

module.exports= postHandler;