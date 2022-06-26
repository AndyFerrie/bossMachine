const meetings = require('express').Router();

const { getAllFromDatabase, addToDatabase, deleteAllFromDatabase, createMeeting } = require('./db');

meetings.get('/', (req, res, next) => {
  res.send(getAllFromDatabase('meetings'));
});

meetings.post('/', (req, res, next) => {
  let newMeeting = addToDatabase('meetings', createMeeting());
  res.status(201).send(newMeeting);
});

meetings.delete('/', (req, res, next) => {
  deleteAllFromDatabase('meetings');
  res.status(204).send();
});

// Leave this exports assignment so that the function can be used elsewhere
module.exports = meetings;