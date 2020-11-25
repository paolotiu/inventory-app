var maxSize = 1 * 1000 * 1000;
const multer = require('multer');
const upload = multer({
    dest: 'public/images',
    limits: { fileSize: maxSize },
}).single('photo');

module.exports = upload;
