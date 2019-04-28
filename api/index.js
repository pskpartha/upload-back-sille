var express = require('express');
var router = express.Router();
const multer = require('multer');

// const storage = multer.diskStorage({
//   destination: function(req, file, cb) {
//     cb(null, './uploads/');
//   },
//   filename: function(req, file, cb) {
//     cb(null, new Date().toISOString() + file.originalname);
//   }
// });
//
// const fileFilter = (req, file, cb) => {
//   // reject a file
//   if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };
//
// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 1024 * 1024 * 5
//   },
//   fileFilter: fileFilter
// });

// http://localhost:3000/
router.get('/', function(req, res, next) {
  res.status(200)
    .json({
      status: 'success',
      message: 'ModSilleBack works!'
    });
});


//////////////////////
// Postgres queries
//////////////////////

var db = require('./queries');
router.get('/api/userobject', db.getAllObject);
router.post('/api/userobject/', db.insertObjectDetails);
router.get('/api/userobject/:id', db.singleObjectDetails);
router.put('/api/userobject/:id', db.updateObjectDetails);
router.delete('/api/userobject/:id', db.deleteObject);

router.post('/api/test', db.testInsert);
// router.get('/api/starships', db.getAllStarships);
// router.get('/api/starships/:id', db.getStarship);
// router.post('/api/starships', db.createStarship);
// router.put('/api/starships/:id', db.updateStarship);
// router.delete('/api/starships/:id', db.removeStarship);
// router.post('/api/upload', upload.single('img_path'), db.createImage);
// router.get('/api/data', db.getAllData);
module.exports = router;