var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'scholarship',
  password : 'scholarship',
  database : 'scholarship'
});

connection.connect();

connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});
app.use(bodyParser.json());
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
    });
app.get('/', function(req, res){
	res.send('Zampleapp');
});
app.get('/:id', function(req, res){
	res.send(req.params.id);
	console.log(req.params.id);
	console.log(req.query.queryparam);
});
app.post('/:name', function(req, res) {
	console.log(req.body);
	var name = req.params.name;
	var amount = req.body.amount;
	connection.query("INSERT INTO SCHOLARSHIPS (NAME, AMOUNT) VALUES (?, ?)", [name, amount]);
	//connection.query("INSERT INTO SCHOLARSHIPS (NAME, AMOUNT) VALUES ("+name+", "+amount+")");
})
app.put('/:id', function(req, res) {
	console.log(req);
	console.log(res);
})
app.delete('/:id', function(req, res) {
	console.log(req);
	console.log(res);
})
app.listen(3000, function () {
	console.log('Example app listening on port 3000!')
	    });
