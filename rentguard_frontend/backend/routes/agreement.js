const router = require('express').Router();
let Agreement = require('../models/agreement.model');

router.route('/').get((req, res) => {
    Agreement.find()
        .then(agreements => res.json(agreements))
        .catch(err => res.status(400).json('Error: ' + err)); 
});

router.route('/add').post((req, res) => {
    const tenant = req.body.tenant;
    const landlord = req.body.landlord;
    const rent = Number(req.body.rent);
    const address = req.body.address;
    const image = req.body.image;
    const rentHiked = Number(req.body.rentHiked);
    const rentPaid = false;

    const newAgreement = new Agreement({
        tenant,
        landlord,
        rent,
        address,
        image,
        rentHiked,
        rentPaid
    });

    newAgreement.save()
        .then(() => res.json('Agreement added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Agreement.findById(req.params.id)
        .then(agreement => res.json(agreement))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Agreement.findById(req.params.id)
        .then(agreement => {
            agreement.tenant = req.body.tenant;
            agreement.landlord = req.body.landlord;
            agreement.rent = Number(req.body.rent);
            agreement.address = req.body.address;
            agreement.image = req.body.image;
            agreement.rentHiked = req.body.rentHiked;
            agreement.rentPaid = req.body.rentPaid;

            agreement.save()
                .then(() => res.json('Agreement updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;