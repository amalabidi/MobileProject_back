const router = require('express').Router();
const {Category} = require("../modules/category");
const auth = require("../middleware/auth");
const admin = require('../middleware/admin');
const joiSchema = require("./schemas/joi_category_schemas") ;

// localhost/Category/4 

router.post('/'/*, [auth, admin]*/, async (req, res) => {

    //req:request object,res:response object

    //object destructuring to get the attribute from the body object 

    const {name, imgUrl} = req.body;
    const{error}=joiSchema.categorySchema.validate({name:name,imgUrl:imgUrl});  
    if(error){
        res.send({error:error["message"]}) ; 
    }else{
    //creating an instance of the Category model
    const category = new Category({name, imgUrl});
    try {
        //trying to save the category in the database
        const results = await category.save();
        //sending back the results to the frontend 
        res.send(results);
    } catch (ex) {
        res.send(ex);
    }
}})

router.get('/',/* auth,*/ async (req, res) => {
    try {
        //find all categries in the database
        const results = await Category.find({});
        console.log(results) ;
        res.send(results);
    } catch (ex) {
        res.send(ex);
    }

})

// router.delete('/:id',async (req,res)=>{
//   const {id} = req.params;
//     try{
//         const results  = await Category.deleteOne({_id:id});
//         res.send(results);
//     }catch(ex){
//         res.send(ex);
//     }

// })


module.exports = router;

