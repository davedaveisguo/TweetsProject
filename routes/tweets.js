const express = require("express");
const router = express.Router();
const getHandler = require('../controller/getHandler');
const postHandler = require('../controller/postHandler');
const putHandler = require('../controller/putHandler');
const deleteHandler = require('../controller/deleteHandler');
const {deleteErrorHandler,putErrorHandler,getErrorHandler} = require('../Utils/Errorhandler');

router.get('/', getErrorHandler, getHandler);

router.post('/', postHandler);

router.put('/:filename', putErrorHandler, putHandler);

router.delete('/:filename', deleteErrorHandler, deleteHandler);


module.exports = router;