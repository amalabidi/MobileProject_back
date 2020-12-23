const mongoose = require('mongoose');


// creating a category shema that defines the shape of the documents within that product.
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 25
    },
    description: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 200
    },
    moreInfo: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 200
    },
    price: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 25
    }
    ,
    category: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 25
    },
    imgUrls: {
        type: [String],
        required: true,
    },
    color:{
        type: String,
        required: true,
    }

})

// creating a product model from the schema : the model handles all interaction with the database

const Product = mongoose.model('Product', productSchema);

exports.Product = Product;
