var express = require("express");
var router = express.Router();
const path = require("path");

if (process.env.NODE_ENV === "production") {
  var buildFolder = path.join(__dirname, "../client", "build");
  router.use(express.static(buildFolder));

  router.get("/", function(req, res) {
    console.warn("........ I am here ........", req);
    res.sendFile(path.join(buildFolder, "index.html"));
  });
}

module.exports = router;
