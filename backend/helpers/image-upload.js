const multer = require('multer');
const path = require('path');

// Destination to store the images
const imageStorage = multer.diskStorage({
    distination: function(req, file, cb) {
        let folder = "";

        if(req.baseURL.includes("users")) {
            folder = "users";
        }

        cb(null, `public/images/${folder}/`)
    },
    filename: function( req, file, cb ) {
        cb(null, Date.now() +
        String(Math.floor(Math.random() * 1000)) +
        path.extname(file.oginalname))
    },

})

const imageUpload = multer({
    storage: imageStorage,
    fileFilter(req, res, cb) {
        if (!file.originalname.math(/\.(png|jpg)$/)) {
            return cb(new Error("Por favor, envie apenas jpg e png"))
        }
        cb(undefined, true);
    },
});

module.exports = { imageUpload };