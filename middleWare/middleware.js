const { check, body, query, validationResult } = require('express-validator');
const { emitWarning } = require('process');
var jwt = require('jsonwebtoken');


exports.typeCheckID = [
    body("id", "id must be integer").isNumeric(),
    check("id", "id is empty").not().isEmpty(),
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            let response = {
                "code": 4043,
                "meta": errors
            }

            return res.status(401).send(response)
        }
        next();
    }
]

exports.typeCheckData = [
    body("name", "name must be integer").isString(),
    check("name", "name is empty").not().isEmpty(),
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            let response = {
                "code": 4043,
                "meta": errors
            }

            return res.status(401).send(response)
        }
        next();
    }
]

exports.tokenControl = [
    (req, res, next) => {
        var token = req.headers['x-access-token'];
        if (token) {
            jwt.verify(token, global.config.secretKey,
                {
                    algorithm: global.config.algorithm

                }, function (err, decoded) {
                    if (err) {
                        let errordata = {
                            message: err.message,
                            expiredAt: err.expiredAt
                        };
                        console.log(errordata);
                        return res.status(401).json({
                            code: "4041",
                            message: 'Unauthorized Access'
                        });
                    }
                    req.decoded = decoded;
                    next();
                });
        } else {
            return res.status(403).json({
                code: "4043",
                message: 'Forbidden Access Token Expired or Undefined'
            });
        }
    }

]

exports.typeStatus = [
    body("name", "name must be integer").isString(),
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            let response = {
                "code": 4043,
                "meta": errors
            }

            return res.status(401).send(response)
        }
        next();
    }
]


