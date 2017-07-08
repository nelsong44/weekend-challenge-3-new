// var express = require('express');
// var router = express.Router();
// var pg = require('pg');
// var pool = new pg.Pool(config);
// var config = {
//   database: 'antares', // name of db
//   host: 'localhost', // default host for db
//   port: 5432, // default port for Postico db
//   max: 10, // max simultaneous connections allowed
//   idleTimeoutMillis: 30000 // 30 seconds connection attempt
// };
//
// // request to retrieve tasks from db
// router.get('/', function(req, res){
//   pool.connect(function(errorConnect, db, done){
//     // if connection fails...
//     if(errorConnect) {
//       console.log('Error connecting to the antaresDb.');
//       res.sendStatus(500); // interal server error
//       // if connection successful...
//     } else {
//       console.log('connected to db!');
//       //query to retrieve all tasks from the db
//       var queryText = 'SELECT * FROM "tasks";';
//       // execute query
//       db.query(queryText, function(errorQuery, result){
//         done();
//         //if query fails...
//         if(errorQuery) {
//           console.log('Attempted to query with', queryText);
//           console.log('Error making query');
//           res.sendStatus(500);
//           //if query is successful...
//         } else {
//           // Send back stored tasks
//           res.send({tasks: result.rows});
//         }
//       }); // end query
//     } // end if
//   }); // end pool
// }); // end get
//
// // request to add a new task to the db
// router.post('/', function(req, res) {
//   // verify new task object
//   console.log(req.body);
//   var task = req.body.newTask;
//   var complete = req.body.complete;
//   var notes = req.body.notes;
//   // connect to pool
//   pool.connect(function(errorConnect, db, done){
//     // if error connecting...
//     if(errorConnect) {
//       console.log('Error connecting to the database.');
//       res.sendStatus(500); // internal server error
//       // if connect successful...
//     } else {
//       // query to add a new task to the db
//       var queryText = 'INSERT INTO "tasks" ("task", "complete", "notes")' +
//                       ' VALUES ($1, $2, $3);';
//       // execute query
//       db.query(queryText, [task, complete, notes], function(errorQuery, result){
//         // disconnect from pool after query is executed
//         done();
//         // if query fails...
//         if(errorQuery) {
//           console.log('Attempted to query with', queryText);
//           console.log('Error making query');
//           res.sendStatus(500); // internal server error
//           // if query is successful...
//         } else {
//           // Send back success message
//           res.sendStatus(200); // OK
//         }
//       }); // end query
//     } // end if
//   }); // end pool
// }); // end post
//
// //export router
// module.exports = router;


var express = require('express');
var router = express.Router();
var pg = require('pg');

var config = {
  database: 'antares', // name of db
  host: 'localhost', // host for db
  port: 5432, // default port for Postico db
  max: 10, // max simultaneous connections allowed
  idleTimeoutMillis: 30000 // 30 seconds connection attempt
};

var pool = new pg.Pool(config);

// request to retrieve tasks from db
router.get('/', function(req, res){
  pool.connect(function(errorConnect, db, done){
    // if connection fails...
    if(errorConnect) {
      console.log('Error connecting to the tasksDb.');
      res.sendStatus(500); // interal server error
      // if connection successful...
    } else {
      console.log('connected to db!');
      //query to retrieve all tasks from the db
      var queryText = 'SELECT * FROM "tasks";';
      // execute query
      db.query(queryText, function(errorQuery, result){
        done();
        //if query fails...
        if(errorQuery) {
          console.log('Attempted to query with', queryText);
          console.log('Error making query');
          res.sendStatus(500);
          //if query is successful...
        } else {
          // Send back stored tasks
          res.send({tasks: result.rows});
        }
      }); // end query
    } // end if
  }); // end pool
}); // end get

// request to add a new task to the db
router.post('/', function(req, res) {
  // verify new task object
  console.log(req.body);
  var task = req.body.newTask;
  var complete = req.body.complete;
  var notes = req.body.notes;
  // connect to pool
  pool.connect(function(errorConnect, db, done){
    // if error connecting...
    if(errorConnect) {
      console.log('Error connecting to the database.');
      res.sendStatus(500); // internal server error
      // if connect successful...
    } else {
      console.log('connected to db!');
      // query to add a new task to the db
      var queryText = 'INSERT INTO "tasks" ("task", "complete", "notes")' +
                      ' VALUES ($1, $2, $3);';
      // execute query
      db.query(queryText, [task, complete, notes], function(errorQuery, result){
        // disconnect from pool after query is executed
        done();
        // if query fails...
        if(errorQuery) {
          console.log('Attempted to query with', queryText);
          console.log('Error making query');
          res.sendStatus(500); // internal server error
          // if query is successful...
        } else {
          // Send back success message
          res.sendStatus(200); // OK
        }
      }); // end query
    } // end if
  }); // end pool
}); // end post

router.delete('/', function(req, res) {
  //verify task id sent from client based on 'delete' click
  var taskId = req.body.taskId;
  console.log(taskId);
  // connect to pool
  pool.connect(function(errorConnect, db, done){
    // if error connecting...
    if(errorConnect) {
      console.log('Error connecting to the database.');
      res.sendStatus(500); // internal server error
      // if connect successful...
    } else {
      console.log('connected to db!');
      // query to delete a task from the db
      var queryText = 'DELETE FROM "tasks"' +
                      ' WHERE "id" = $1;';
      // execute query
      db.query(queryText, [taskId], function(errorQuery, result){
        // disconnect from pool after query is executed
        done();
        // if query fails...
        if(errorQuery) {
          console.log('Attempted to query with', queryText);
          console.log('Error making query');
          res.sendStatus(500); // internal server error
          // if query is successful...
        } else {
          // Send back success message
          res.send({message: 'deleted task!'});
        }
      }); // end query
    } // end if
  }); // end pool
}); // end delete

module.exports = router;
