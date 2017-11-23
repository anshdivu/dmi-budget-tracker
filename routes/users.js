const Person = require("../models/person");
var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/:userId", function(req, res, next) {
  return Person.findById(req.params.userId)
    .then(
      person =>
        person ? res.json(person) : Promise.reject(new Error("Not Found"))
    )
    .catch(err => {
      console.error(err);
      res.status(404).json(err);
    });
});

module.exports = router;
