$(document).ready(function() {
  console.log('JQ linked');
  //on page load...
  getTasks();
  $('#addButton').on('click', addTask);
  $('#tasksDiv').on('click', '.delete', deleteTask);
  $('#tasksDiv').on('click', '.status', swapStatus);
});//end onready

//GET tasks stored in db to display on DOM
function getTasks() {
  $.ajax({
    type: 'GET',
    url: '/tasks',
    //on success...
    success: function(response) {
      //verify data from db
      console.log('Retrieved tasks from db: ', response);
      //call to display tasks on DOM
      displayOnDom(response);
    }//end success
  });//end GET
}//end getTasks

//send a new task to the server to POST in db
function addTask() {
  //retrieve user input and format as obj
  var newTask = $('#taskIn').val();
  var taskNotes = $('#notesIn').val();
  console.log(newTask);
  //send task obj to server
  $.ajax({
    type: 'POST',
    url: '/tasks',
    data: {
      newTask: newTask,
      complete: false,
      notes: taskNotes
    },
    //on success...
    success: function(response) {
      //confirm success through logging message
      console.log('task sent to server: ' + response);
      getTasks();
      $('#taskIn').val('');
      $('#notesIn').val('');
    }//end success
  });//end POST
  }//end addTask

//request to delete a task from the db
function deleteTask() {
  console.log($(this).parent().parent().data('singleId'));
  var taskId = $(this).parent().parent().data('singleId');
  $.ajax({
    type: 'DELETE',
    url: '/tasks',
    data: {
      taskId: taskId
    },
    success: function(response) {
      console.log('Deleted task with id: ' + taskId + ' from the db');
      getTasks();
    }//end success
  });//end DELETE
  getTasks();
}//end deleteTask

//change completion status of a task
function swapStatus() {
  console.log('swapStatus called');
}//end swapStatus

//append tasks to DOM
function displayOnDom(tasksFromDb) {
  //clear div before appending updated task list
  $('#appendedTasks').empty();
  //append tasks to DOM
  for (var i = 0; i < tasksFromDb.tasks.length; i++) {
    var singleTask = tasksFromDb.tasks[i].task;
    var singleNote = tasksFromDb.tasks[i].notes;
    var singleId = tasksFromDb.tasks[i].id;
    // console.log(singleTask);
    // console.log(singleNote);
    // console.log(singleId);
    var $tr = $('<tr></tr>');
    $tr.data('singleId', singleId);
    $tr.append('<td><input type="checkbox" class="status" data-id="' + singleId + '"></td>');
    $tr.append('<td>' + singleTask + '</td>');
    $tr.append('<td>' + singleNote + '</td>');
    $tr.append('<td><button class ="delete" data-id="' + singleId + '">Delete</button></td>');
    $('#appendedTasks').append($tr);
  }//end for
  var $trLast = $('<tr id="lastRow"><td></td><td></td><td></td><td></td></tr>');
  $('#appendedTasks').append($trLast);
}//end displayOnDom
