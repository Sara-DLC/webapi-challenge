const express = require('express');
const db = require('../data/helpers/projectModel');


const router = express.Router();

router.get('/', (req, res) => {
    db.get()
    .then(project => {
        res.status(200).json(project);
    })
    .catch(error => {
        console.log(`error from /GET request`, error);
        res.status(500).json({
            errorMessage: `Could not retrieve project information`
        });
    });
});

router.get('/:id', validateId,  (req, res) => {
const id = req.params.id;
db.getProjectActions(id)
.then(userById => {
    userById ? res.status(200).json(userById) : res.status(404).json({ message: "The project with the specified ID does not exist." });
})
.catch(error => {
    console.log(error);
    res.status(500).json({ error: "The project information could not be retrieved." });
});
});

router.post('/',  validateProject, (req, res) => {
    const project = req.body;
    db.insert(project)
    .then(newData => {
        res.status(201).json(newData)
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({error: "There was an error while saving the project to the database"  })
    });
});






//middleware

function validateId (req, res, next) {
    const id = req.params.id;
    db.get(id)
    .then(project => {
        if(project) {
            req.project = project
            next()
        }
        else {
            res.status(400).json({
                message: `invalid project id`
            })
        }
    })
    .catch(error => {
        res.status(500).json({ error: `Project does not exist`, error
        });
    });
};

function validateProject (req, res, next) {
    if (Object.keys(req.body).length > 0) {
        if (req.body.description && req.body.name){
            next();
        } else {
            res.status(400).json({ errorMessage: "Please provide a name and description for the project."})
        } 
    } else {
        res.status(400).json({ errorMessage: "There was an error while saving the project to the database" })
    }
}


module.exports = router;