const router = require('express').Router();
const { createBootcamp, getBootcamp, getBootcamps, deleteBootcamp, updatetBootcamp } = require('../controllers/bootcamps');

router.route('/')
  .get(getBootcamps)
  .post(createBootcamp)

router.route('/:id')
  .get(getBootcamp)
  .put(updatetBootcamp)
  .delete(deleteBootcamp)

module.exports = router