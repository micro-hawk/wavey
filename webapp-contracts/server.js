const express = require('express');

var app = express();
const port = 8902

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static("public"));

app.get('/', function(req, res) {
  res.render('pages/index');
});

app.listen(port);
console.log(`Server is listening on port: ${port}`);