const path = require("path");
const fs = require("fs");

const dataPath = path.join(__dirname, "../data");

const deleteHandler = (req, res, next) => {
  const filename = req.params.filename;
  const pathToFile = path.join(dataPath, `${filename}.json`);
  fs.unlink(pathToFile, (err) => {
    if (err) {
      throw err;
    }
    console.log("Deleted!");
  });
  res.status(200).send(`Your tweet with id: ${filename} been deleted.`);
};

module.exports = deleteHandler;
