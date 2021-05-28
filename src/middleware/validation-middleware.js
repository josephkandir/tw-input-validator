
const FieldValidator = require('../models/fieldValidator');
const validator  = require('../helpers/validate');

exports.validate_table_user = (req, res, next) => {
    const _tableName = req.params.tableName;

    FieldValidator.find({
        tableName: _tableName,
    })
    .select('tableName columnName validationType validationValue')
    .exec()
    .then(result => {
        var passwordRule = '';
        for(const item of result) {
            if(item.columnName === 'password') {
                const data1 = item.validationType.split(':');
                
                if(data1.length > 1) {
                    const value = item.validationValue.split(',');
                    const data = [data1[0] + ':' + value];
                    passwordRule = passwordRule.concat(data, '|');
                } else {
                    passwordRule = passwordRule.concat(data1, '|');
                }
            }
        }
        passwordRule = passwordRule.slice(0, -1);

        const validationRule = {
            'password': `${passwordRule}`
        }

        return validationRule;
    })
    .then(validationRule => {
        validator(req.body, validationRule, {}, (err, status) => {
            if (!status) {
                res.status(412)
                    .send({
                        success: false,
                        message: 'Validation failed',
                        data: err
                    });
            } else {
                next();
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}