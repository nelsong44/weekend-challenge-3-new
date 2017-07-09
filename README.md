# creating a full stack 'To Do' app
## components
#### Base Mode
* Create a front end experience that allows a user to create a task
  - [x] Create header for to-do list
  - [x] Input field for user to create a new task
  - [x] Input field for user to create a notes for the task
  - [x] Create an 'Add task' button to submit new task
  - [x] Create a div for tasks to be displayed on DOM below input
  - [x] Dynamically display a 'Checkbox' and 'Delete' button for each new task


* Store the created task inside db
  - [x] Create new table to store task data in Antares Db, (tasks)
  - [x] GET request to retrieve the stored sample task,  getTasks()


* Refresh view to include new task when a new task is created
  - [x] Call getTasks() after every new task added to refresh display


* Create a 'Complete' and 'Delete' option for each task
  - [x] create buttons with click events for each


* Change visual representation of a completed task
  + completing a task should be reflected in the db and on the front end
    - [x] add column in db table to mark a task as complete or incomplete (checkbox)
    - [x] call swapStatus()
    - [x] create if statement to check status of task, change display by adding a
      class (strike though and text color change) if task status is true
    - [x] change status of task to true in db
    - [x] if status of task is false, remove class, change status to false in db

  + deleting a task should be reflected in the db and on the front end
    - [x] call deleteTask() using data to target specific task to delete
    - [x] permanently delete task from the db, call getTasks() to refresh display

#### Hard Mode
* create an 'are you sure: yes / no' option when deleting a task
  - [x] create alert that appears on click of 'delete' button

#### Pro Mode
* bring completed tasks to the bottom of the list and newly created tasks to the top of the list
  - [x] prepend uncompleted tasks to DOM dynamically as they are created by user
  - [x] when checkbox is checked, re-append the task to the bottom of the task list
  - [x] when checkbox is unchecked, prepend task to top of list
---
##### Notes
 * CRUD Ops:
 * `addTask()` - POST
 * `getTasks()` - GET
 * `editTask()` - PUT
 * `deleteTask()` - DELETE
