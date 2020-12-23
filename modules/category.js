const mongoose = require('mongoose');

// creating a category shema which will defines the shape of the documents within that collection.
const categoryShema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255
    },
    imgUrl: {
        type: String,
        maxlength: 255
    },
})
// creating a model from a schema : the model handles all interaction with the database
const Category = mongoose.model('Category', categoryShema);
exports.Category = Category;