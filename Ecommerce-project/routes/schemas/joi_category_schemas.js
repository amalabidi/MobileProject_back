const Joi = require('joi');

const categorySchema = Joi.object({
    name: Joi.string().required().min(2).max(20) ,
    
    imgUrl: Joi.string().required().max(255) });
   
exports.categorySchema=categorySchema ;
