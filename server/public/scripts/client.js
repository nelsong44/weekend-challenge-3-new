$(document).ready(function() {
  console.log('JQ linked');
  //on page load...
  getTasks();
  //click events...
  $('#addButton').on('click', addTask);
  $('#tasksDiv').on('click', '.delete', deleteTask);
  $('#tasksDiv').on('click', '.status', swapStatus);
  // $('#tasksDiv').on('click', '.edit', editTask);
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
  //check if input fields are empty, ifos propmt user to fill them
  if($('#taskIn').val() === '') {
    alert('Be sure to add your task!');
  }
  else {
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
  }//end if
}//end addTask

//request to delete a task from the db
function deleteTask() {
  console.log($(this).parent().parent().data('singleId'));
  var taskId = $(this).parent().parent().data('singleId');
  //trigger alert for user to verify delete
  var answer = confirm("Are you sure you want to delete this task?");
    if (answer) {
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
    } else{
        return false;
      }//end if
}//end deleteTask

//edit existing task
// function editTask() {
//   var taskId = $(this).parent().parent().data('singleId');
//   var taskEl = $(this).parent().parent().children()[1];
//   var notesEl = $(this).parent().parent().children()[2];
//   var task = $('#taskIn').val(taskEl.innerHTML);
//   var notes = $('#notesIn').val(notesEl.innerHTML);
// }//end editTask

//change completion status of a task
function swapStatus() {
  // var status = $(this)[0].checked;
  var status = $(this)[0].checked;
  console.log(status);
  var task = $(this).parent().parent();
  var taskId = $(this).parent().parent().data('singleId');
  if(status) {
    $(this).parent().parent().addClass('statusComplete');
    status = true;
    $('#appendedTasks').append(task);
    alert('Way to Go!!');
  }
    else {
      $(this).parent().parent().removeClass('statusComplete');
      status = false;
      $('#appendedTasks').prepend(task);
  }//end if
  $.ajax({
    type: 'PUT',
    url: '/tasks',
    data: {
      taskId: taskId,
      status: status
    },
    success: function(response) {
      console.log('status changed: ', response);
    }//end success
  });//end PUT
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
    var $tr = $('<tr></tr>');
    $tr.data('singleId', singleId);
    $tr.append('<td><input type="checkbox" class="status" data-id="' + singleId + '"></td>');
    $tr.append('<td>' + singleTask + '</td>');
    $tr.append('<td>' + singleNote + '</td>');
    $tr.append('<td><button class="delete" data-id="' + singleId + '"><i class="fa fa-minus-circle"></i></button></td>');
    $tr.append('<td><button class="edit" data-id="' + singleId + '"><i class="fa fa-pencil" aria-hidden="true"></i></button></td>');
    $('#appendedTasks').prepend($tr);
  }//end for
}//end displayOnDom
