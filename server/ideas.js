const ideas = require('express').Router();

const checkMillionDollarIdea = require('./checkMillionDollarIdea');
const {
    addToDatabase,
    getAllFromDatabase,
    getFromDatabaseById,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
} = require('./db');

ideas.param('ideaId', (req, res, next, id) => {
    const idea = getFromDatabaseById('ideas', id);
    if (idea) {
        req.idea = idea;
        next();
    } else {
        res.status(404).send();
    }
});

ideas.get('/', (req, res, next) => {
    const ideas = getAllFromDatabase('ideas')
    res.status(200).send(ideas);
});

ideas.post('/', checkMillionDollarIdea, (req, res, next) => {
    const newIdea = addToDatabase('ideas', req.body);
    res.status(201).send(newIdea);
});

ideas.get('/:ideaId', (req, res, next) => {
    res.send(req.idea);
});

ideas.put('/:ideaId', checkMillionDollarIdea, (req, res, next) => {
    const updatedIdea = updateInstanceInDatabase('ideas', req.body);
    res.status(200).send(updatedIdea);
});

ideas.delete('/:ideaId', (req, res, next) => {
    const deleted = deleteFromDatabasebyId('ideas', req.params.ideaId);
    if (deleted) {
      res.status(204);
    } else {
      res.status(500);
    }
    res.send();
  });


// Leave this exports assignment so that the function can be used elsewhere
module.exports = ideas;