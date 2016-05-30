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

app.post('/update-delete', function(req, res) {
  if (req.body.action === 'edit') {
    var id = req.body.id;
    var traditional = req.body.traditional;
    var simplified = req.body.simplified;
    var pinyin_numbers = req.body.pinyin_numbers;
    var pinyin_marks = req.body.pinyin_marks;
    var translation = req.body.translation;

    var sqlQuery = `UPDATE dictionary SET traditional='${traditional}', simplified='${simplified}',
      pinyin_numbers='${pinyin_numbers}', pinyin_marks='${pinyin_marks}', translation='${translation}' WHERE id=${id}`;

    console.log(sqlQuery);

    connection.query(sqlQuery, function(err, rows, fields) {
      if (err) {
        throw err;
      }
      res.end('{"success" : "Updated Successfully", "status" : 200}');
    });
  } 
  else if (req.body.action === 'delete') {

  }
  console.log(req.params);
  console.log(req.query.id);
  console.log(req.body);
});
app.listen(3000);