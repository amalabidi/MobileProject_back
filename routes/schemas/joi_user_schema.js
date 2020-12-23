const Joi = require('joi');

const signupSchema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    password: Joi.string().required() ,


    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: false } })
})


const  updateSchema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: false } })
})


exports.updateSchema=updateSchema ;
exports.SignupSchema=signupSchema ;
