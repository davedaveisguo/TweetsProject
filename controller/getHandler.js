const path = require("path");
const fs = require("fs");

const dataPath = path.join(__dirname, "../data");



/**
 * Get contents of all tweets.
 * @return The contents of all files in json format.
 */

const getHandler = (req, res, next) => {
  const tweets = [];
  fs.readdir(dataPath, (err, files) => {
    files.forEach((file) => {
      const filePath = path.join(dataPath, file);
      let fileContent = JSON.parse(fs.readFileSync(filePath));
      tweets.push(fileContent.content);
    });
    res.status(200).json({ tweets });
  });
};




module.exports = getHandler;
