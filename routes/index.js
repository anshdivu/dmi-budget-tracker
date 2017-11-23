var express = require('express');
var router = express.Router();
const path = require('path');

if (process.env.PROD) {
  var buildFolder = path.join(__dirname, '../client', 'build');
  router.use(express.static(buildFolder));

  router.get('/', function(req, res) {
    res.sendFile(path.join(buildFolder, 'index.html'));
  });
}

module.exports = router;
