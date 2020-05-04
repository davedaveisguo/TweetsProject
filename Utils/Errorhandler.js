const path = require("path");
const fs = require("fs");

const dataPath = path.join(__dirname, "../data");

const deleteErrorHandler = (req, res, next) => {
  const filename = req.params.filename;
  const pathToFile = path.join(dataPath, `${filename}.json`);
  if (!fs.existsSync(pathToFile)) {
    res.status(404).send(`${filename} does not exist`);
  }
  next();
};

const putErrorHandler = (req, res, next) => {
  const filename = req.params.filename;
  const pathToFile = path.join(dataPath, `${filename}.json`);
  if (!fs.existsSync(pathToFile)) {
    res.status(404).send(` ${filename}.json does not exist`);
  }
  next();
};

const getErrorHandler = (req, res, next) => {
  fs.readdir(dataPath, (err, files) => {
    if (files.length === 0) {
      res.status(404).send(`There is no data under ${dataPath} directory`);
    }
    next();
  });
};

module.exports = { deleteErrorHandler, putErrorHandler, getErrorHandler };
