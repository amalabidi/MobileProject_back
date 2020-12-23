const router = require("express").Router();
const {User} = require("../modules/user");
const {Product} = require("../modules/product");
const auth = require('../middleware/auth');

router.get("/",auth, async (req, res) => {
    const email = req.user["email"];
    /*const {bag} = req.params ;*/
    try {
        var user = await User.findOne({email: email});
         console.log(user.bag);
        var resultArray = await Product.find({_id: {$in: user.bag}});
        
        console.log(resultArray);
        res.send(resultArray);
    } catch (ex) {
        res.send(ex);
    }
});

router.post("/",auth, async (req, res) => {
    const email = req.user["email"];
    const {id} = req.body;

    try {
        var result = await User.update(
            {
                email
            },
            {$push: {bag: id}}
        );
        console.log(result);
        res.send(result);
    } catch (ex) {
        res.send(ex);
    }
});


router.delete("/:id",auth, async (req, res) => {
    const email = req.user["email"];

    try {
        const {id} = req.params;

        const results = await User.update(
            {
                email
            },
            {$pull: {bag: id}}
        );
        let user = await User.findOne({
            email,
        });
        res.send(user);
    } catch (ex) {
        res.send(ex);
    }
});

module.exports = router;

