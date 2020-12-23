const router = require('express').Router();
const { cloudinary } = require('../utils/cloudinary');


router.post('/', async (req, res) => {
    try {
        const fileStr = req.body.data;
        var uploadStr = 'data:image/jpeg;base64,' + fileStr;
        const uploadResponse = await cloudinary.uploader.upload(uploadStr, {
            upload_preset: 'dev_setups',
        });
        console.log(uploadResponse.secure_url);
       res.json({ url: uploadResponse.secure_url });
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Something went wrong' });
    }
});


module.exports = router;
