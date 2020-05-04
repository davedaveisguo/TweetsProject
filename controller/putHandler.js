const express = require("express");
const path = require("path");
const fs = require("fs");

/**
 * update a tweet.
 * @param filename
 * @Input  req.body.content
 * @return The content updated to specific file
 */

const putHandler = (req, res, next) => {
  const dataPath = path.join(__dirname, "../data");
  const filename = req.params.filename;
  const pathToFile = path.join(dataPath, `${filename}.json`);
  const content = {
    id: filename,
  };
  content.content = req.body.content;

  fs.writeFile(pathToFile, JSON.stringify(content), (err) => {
    if (err) {
      throw err;
    }
    console.log("saved");
  });
  res.status(200).send(`Your file ${filename}.json has been updated`);
};

module.exports = putHandler;
