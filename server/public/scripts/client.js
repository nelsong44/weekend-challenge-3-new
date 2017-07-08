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
      displayOnDom();
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
    }//end success
  });//end post
  }//end addTask

//append tasks to DOM
function displayOnDom() {
  console.log('displayOnDom called');
  // var singleTask =
  // console.log(singleTask);
  //clear div before appending updated task list
  // $('#taskList').empty();
  // $('#taskList').append(singleTask);
}
