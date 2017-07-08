# creating a full stack 'To Do' app

## components
### Base Mode

1. Create a front end experience that allows a user to create a task
  - [ ] Create header for to-do list
  - [ ] Input field for user to create a new task
  - [ ] Create an 'Add task' button to submit new task
  - [ ] Create a div for tasks to be displayed on DOM below input
  - [ ] Dynamically display a 'Checkbox' and 'Delete' button for each new task


2. Store the created task inside db
  - [ ] Create new table to store task data in Antares Db, (tasks)
  - [ ] Store a sample task to aid UX that displays on page load
  - [ ] GET request to retrieve the stored sample task,  getTasks()
  - [ ] Overwrite sample task with first created task

3. Refresh view to include new task when a new task is created
  - [ ] Call getTasks() after every new task added to refresh display

4. Create a 'Complete' and 'Delete' option for each task

5. Change visual representation of a completed task
  + completing a task should be reflected in the db and on the front end
    - [ ] add column in db table to mark a task as complete or incomplete
    - [ ] if/switch statement to check status of task, change display
    based on task completion status

  + deleting a task should be reflected in the db and on the front end
    - [ ] call deleteTask() using data to target specific task to delete
    - [ ] permanently delete task from the db, call getTasks() to refresh display
### Hard Mode
6. create an 'are you sure: yes / no' option when deleting a task

### Pro Mode
7. bring completed tasks to the bottom of the list and newly created tasks to the top of the list

#### Notes
 * CRUD Ops:
 * `createTask()` > PUT
 * `getTasks()` > GET/POST
 * `editTask()` > PUT
 * `deleteTask()` > DELETE 
