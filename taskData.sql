CREATE TABLE tasks(
	id SERIAL PRIMARY KEY,
	task VARCHAR (1000) NOT NULL,
  complete boolean NOT NULL,
	notes VARCHAR (1000) NOT NULL
);

INSERT INTO tasks
VALUES (1,	'Create your first task!', 'true', 'Soon you will be off and running!');
