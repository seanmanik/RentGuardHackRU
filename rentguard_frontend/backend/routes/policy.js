const router = require('express').Router();
let Policy = require('../models/policy.model');

router.route('/').get((req, res) => {
    Policy.find()
        .then(policies => res.json(policies))
        .catch(err => res.status(400).json('Error: ' + err)); 
});

router.route('/:id').get((req, res) => {
    Policy.findById(req.params.id)
        .then(policy => res.json(policy))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const maxPercentageIncrease = Number(req.body.maxPercentageIncrease);
    const year = Number(req.body.year);

    const newPolicy = new Policy({
        maxPercentageIncrease,
        year,
    });

    newPolicy.save()
        .then(() => res.json('Policy added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Policy.findById(req.params.id)
        .then(policy => {
            policy.maxPercentageIncrease = Number(req.body.maxPercentageIncrease);
            policy.year = Number(req.body.year);

            policy.save()
                .then(() => res.json('Policy updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;