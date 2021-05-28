const mongoose = require('mongoose');

const ValidationType = require('../models/validationType');

exports.validationtype_get_all = (req, res, next) => {
    ValidationType.find()
    .select('_id name description')
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            validationType: docs.map(doc => {
                return {
                    name: doc.name,
                    description: doc.description,
                    _id: doc._id
                };
            })
        };
        res.status(200).json(response);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}