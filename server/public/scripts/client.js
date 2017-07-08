$(document).ready(function() {
  console.log('JQ linked');
  //on page load...
  getTasks();
  $('#addButton').on('click', addTask);
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
  });//end get
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
    }//end success
  });//end post
  }//end addTask

//append tasks to DOM
function displayOnDom(tasksFromDb) {
  //clear div before appending updated task list
  $('#tasksDiv').empty();
  //append tasks to DOM
  for (var i = 0; i < tasksFromDb.tasks.length; i++) {
    var singleTask = tasksFromDb.tasks[i].task;
    var singleNote = tasksFromDb.tasks[i].notes;
    var singleId = tasksFromDb.tasks[i].id;
    console.log(singleTask);
    console.log(singleNote);
    var $tr = $('<tr></tr>');
    $tr.data('singleId', singleId);
    $tr.append('<td>' + singleTask + '</td>');
    $tr.append('<td>' + singleNote + '</td>');
    $('#tasksDiv').append($tr);
  }//end for
}//end displayOnDom
