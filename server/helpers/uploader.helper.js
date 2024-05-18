let multer = require('multer');


exports.uploadImagesToMemory = () => {
    try {
        const storage = multer.memoryStorage();
        const upload = multer({
            storage,
            fileFilter: (req, file, cb) => {
                if (file) {
                    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
                        cb(null, true);
                    } else cb(new multer.MulterError("Only .png, .jpg and .jpeg format allowed!"), false);
                }
                else cb(new multer.MulterError("Image must be entered"), false);

            },
        });

        return upload;
    } catch (err) {
        console.log("err.message", err.message);
        return
    }
}