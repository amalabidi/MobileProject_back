const router = require('express').Router();
const {Product} = require('../modules/product');
const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const joiSchema = require("./schemas/joi_product_schema") ;

// finding the liste ofproducts by categorie 
router.get('/bycategory/:category', async (req, res) => {
    const {category} = req.params;
    try {
           
        const results = await Product.find({"category": category});
        res.send(results);
    } catch (ex) {
        res.send(ex);
    }
})

router.get('/adminpannel', async (req, res) => {
 
    try {
                const results = await Product.find({  });
                console.log("hello2");
                res.send(results);
        
    } catch (ex) { 
       console.log( ex) ;
        res.send(ex); }
})

//  finding a single product by id 
router.get('/product/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const results = await Product.find({"_id": id});
        console.log(results);
        res.send(results);
    } catch (ex) {
        res.send(ex);
    }
})

// creating a new product
router.post('/', [auth, admin], async (req, res) => {
    const {name, description, moreInfo, price, category, imgUrls,color} = req.body;
    const{error}=joiSchema.productSchema.validate({name:name,description:description,moreInfo:moreInfo,price:price,category:category,imgUrls:imgUrls,color:color});  

    if(error){
        res.send({error:error["message"]}) ; 
    }else{
    const product = new Product({name, description, moreInfo, price, category, imgUrls,color});
    try {
        const results = await product.save();
        res.send(results);
    } catch (e) {
        res.send(e);
    } }})


// deleting a product by an id 
router.delete('/:id', /*[auth, admin],*/ async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id).exec();
    res.send("success");
})

//  updating a product 
router.put('/', /*[auth, admin],*/ async (req, res) => {
    const {name, description, moreInfo, price, category, imgUrls,id,color} = req.body;
   console.log("imgUrls: ",imgUrls,"category",category);
    try {
        const filter = {"_id": id};
        console.log(id);
        const update = {
            name,
            description,
            moreInfo,
            price,
            category,
            imgUrls,
            color
        };
        let product = await Product.findByIdAndUpdate(filter, update, {returnOriginal: false})
        res.send(product);

    } catch (ex) {
        res.send(ex);
    }
})

// search functionality
router.get('/search', async (req, res) => {
    const {search} = req.query;
    console.log(search) ;
    if (search){
        const products = await Product.find({ name: { $regex: search ,$options: 'i'}});
        res.send(products);
    }else{
        res.send("no product");
    }
})


// Sorting products by category
router.get('/', async (req, res) => {
    const {category,price, date } = req.query;
    if (category)
    { if ((!date) && price){
        const results = await Product.find( {category: category}).sort({price: price});
        res.send(results);
    }
    else if ( (date) && (!price)){
        const results = await Product.find( {category: category}).sort({createdAt: date});
        res.send(results);
    }}
    else{
         if((!date) && (price)){
        const results = await Product.find().sort({price: price});
        res.send(results);
    }
    else if ((date) && (!price)){
        const results = await Product.find().sort({date: date});
        res.send(results);}
    else if ((!date) && (!price)){
    try {
        const results = await Product.find({});
        res.send(results);
    } catch (ex) { res.send(ex); }

    }    
}

})



module.exports = router;
