const router = require("express").Router();
const {User} = require("../modules/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
//  authenticating the user  by searching a user in the data base with the same email and then verifying
// if the passwords are identical and in that case generating a token 
router.post('/', async (req, res) => {
    try {
        let user = await User.findOne({email: req.body.email});
        
        if (!user) {
            res.send({"error":"invalid mail or password"});
            return null;
        }else{
        if (await bcrypt.compare(req.body.password, user.hashedPassword)) {
            token = user.generateToken();
            res.header("x-auth-token", token).send(user);
        } else {
            res.send({"error":"invalid mail or password"});
        }}
    } catch (e) {
        console.log(e);
        res.send(e);
    }
})
module.exports = router;