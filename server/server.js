var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var taskList = require('./routes/tasks.js');
var port = process.env.PORT || 5000;

app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use('/tasks', taskList);

//catch all routes
app.get('/*', function(req, res) {
  var file = req.params[0] || 'views/index.html';
  res.sendFile(path.join(__dirname, 'public', file));
}); //end get

//connecting to port
app.listen(port, function(){
  console.log("listening on port", port);
});
