const Joi = require('joi');

const productSchema = Joi.object({
     name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

     description: Joi.string()
                  .required()
                   .min(2).
                   max(200), 
    

     moreInfo: Joi.string().max(150), 

     price: Joi.string().
             required(),

     category:Joi.string().
                   required().
                   max(20),
      imgUrls:Joi.array().min(1).items(Joi.string()),
      color : Joi.string().required()
})

exports.productSchema = productSchema;
