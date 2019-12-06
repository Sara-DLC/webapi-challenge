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

module.exports = router;