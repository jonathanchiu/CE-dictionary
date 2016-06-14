// Web framework/middleware for Node
var express = require('express');
// Package for facilitating MySQL DB connection
var mysql = require('mysql');
// Package for parsing AJAX POST data
var bodyParser = require('body-parser');

var path = require('path');
var app = express();

// Create connection to the MySQL DB, edit information accordingly
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'chiuzhangchics3200project'
});

// Serve static assets
app.use(express.static(__dirname + '/public'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Given a formatted SQL query, execute it and return JSON result of rows
function execute(query, res) {
  connection.query(query, function(err, rows, fields) {
    if (err) {
      throw err;
    }
    console.log(rows);
    res.json(rows);
  });
}

// Routes for serving static HTML pages
app.get('/create', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/create.html'));
});

app.get('/deleted-archive-page', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/deleted-archive.html'));
});

app.get('/favorites-page', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/favorites.html'));
})

/**
 * GET route for displaying list of favorited words
 */ 
app.get('/favorites', function(req, res) {
  var sqlQuery = `SELECT * FROM info i JOIN dictionary d ON i.id = d.id WHERE favorites > 0`;

  execute(sqlQuery, res);
});

app.delete('/hard-delete/:id', function(req, res) {
  var id = req.params.id;
  var sqlQuery = `DELETE FROM dictionary WHERE id=${id}`;

  connection.query(sqlQuery, function(err, rows, fields) {
    if (err) {
      throw err;
    }
    res.end('{"success" : "Deleted Successfully", "status" : 200}');
  });
});

/**
 * PUT route for favoriting a word
 */ 
app.put('/favorite/:id', function(req, res) {
  var id = req.params.id;
  var sqlQuery = `UPDATE info SET favorites = favorites + 1 WHERE id=${id}`;

  connection.query(sqlQuery, function(err, rows, fields) {
    if (err) {
      throw err;
    }
    res.end('{"success" : "Favorited Successfully", "status" : 200}');
  });
});

/**
 * PUT route for restoring a "deleted" word
 */
app.put('/restore/:id', function(req, res) {
  var id = req.params.id;
  var sqlQuery = `UPDATE info SET deleted=NULL WHERE id=${id}`;
  connection.query(sqlQuery, function(err, rows, fields) {
    if (err) {
      throw err;
    }
    res.end('{"success" : "Restored Successfully", "status" : 200}');
  });
});

/**
 * GET route for displaying "deleted" words
 */ 
app.get('/deleted-archive', function(req, res) {
  var sqlQuery = `SELECT * FROM info i JOIN dictionary d ON i.id = d.id WHERE deleted IS NOT NULL`;

  execute(sqlQuery, res);
});

/**
 * POST route for creating a new word
 */
app.post('/create', function(req, res) {
  var traditional = req.body.traditional;
  var simplified = req.body.simplified;
  var pinyin_numbers = req.body.pinyin_numbers;
  var pinyin_marks = req.body.pinyin_marks;
  var translation = req.body.translation;
  var sqlQuery = `INSERT INTO dictionary (
            traditional,
            simplified,
            pinyin_numbers,
            pinyin_marks,
            translation
        )
        VALUES
       ('${traditional}', '${simplified}', '${pinyin_numbers}', '${pinyin_marks}', '${translation}')`;

  connection.query(sqlQuery, function(err, rows, fields) {
    if (err) {
      throw err;
    }
    res.end('{"success" : "Created Successfully", "status" : 200}');
  });
  res.json(req.body);
});

/**
 * GET route for searching
 * :type is one of 'traditional', 'simplified', 'pinyin_numbers' or 'translation'
 * :query is the user's input in the search bar 
 */
app.get('/search/:type/:query', function(req, res) {
  var sqlQuery = "SELECT * FROM dictionary d JOIN info i on d.id = i.id JOIN category c on c.id = i.category_id WHERE " 
    + req.params.type + " REGEXP '[[:<:]]" + req.params.query + "[[:>:]]' AND i.deleted IS NULL";

  execute(sqlQuery, res);
});

/**
 * POST route for handling edit, delete operations
 */
app.post('/update-delete', function(req, res) {

  // SQL logic for handling editing a word
  if (req.body.action === 'edit') {
    var id = req.body.id;
    var traditional = req.body.traditional;
    var simplified = req.body.simplified;
    var pinyin_numbers = req.body.pinyin_numbers;
    var pinyin_marks = req.body.pinyin_marks;
    var translation = req.body.translation;

    var sqlQuery = `UPDATE dictionary SET traditional='${traditional}', simplified='${simplified}',
      pinyin_numbers='${pinyin_numbers}', pinyin_marks='${pinyin_marks}', translation='${translation}' WHERE id=${id}`;

    connection.query(sqlQuery, function(err, rows, fields) {
      if (err) {
        throw err;
      }
      res.end('{"success" : "Updated Successfully", "status" : 200}');
    });
  }

  // SQL logic for "deleting" a word
  else if (req.body.action === 'delete') {
    var id = req.body.id;

    // Convert JS datetime to MySQL compatible datetime
    var date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    var sqlQuery = `UPDATE info SET deleted='${date}' WHERE id=${id}`;
    // var sqlQuery = `DELETE FROM dictionary WHERE id=${id}`;

    connection.query(sqlQuery, function(err, rows, fields) {
      if (err) {
        throw err;
      }
      res.end('{"success" : "Deleted Successfully", "status" : 200}');
    });
  }
});

app.listen(3000);