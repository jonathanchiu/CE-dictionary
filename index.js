// Web framework/middleware for Node
var express = require('express');
// Package for facilitating MySQL DB connection
var mysql = require('mysql');
// Package for parsing AJAX POST data
var bodyParser = require('body-parser');
var app = express();
// Create connection to the MySQL DB
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'is2000'
});

// Serve static assets
app.use(express.static(__dirname + '/public'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

/**
 * GET route for searching
 * :type is one of 'traditional', 'simplified', 'pinyin_numbers' or 'translation'
 * :query is the user's input in the search bar 
 */
app.get('/search/:type/:query', function(req, res) {
  var sqlQuery = "SELECT * FROM dictionary WHERE " + req.params.type + " REGEXP '[[:<:]]" + req.params.query + "[[:>:]]'";
  
  connection.query(sqlQuery, function(err, rows, fields) {
    if (err) {
      throw err;
    }
    res.json(rows);
  });

});

app.post('/testing', function(req, res) {
  console.log(req.params);
  console.log(req.query.id);
  console.log(req.body);
});
app.listen(3000);