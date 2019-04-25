const express = require('express');
const router = express.Router();
// var multer = require('multer');

// database connection info
const Pool = require('pg').Pool;
const pool = new Pool({
      user: 'jagz',
      host: 'localhost',
      database: 'weatherdb',
      password: '123456',
      port: 5432,
});

const ExifImage = require('exif').ExifImage;

// storeimage api
router.post('/storeImage', (req, res, next) => {
      console.log('store image me aaya', req.files);
      let title, raster, lat, long;
      res.send({
            code: 200
      });
      // pool.query(`INSERT INTO images(title, raster, lat, long) VALUES (${title})`, (error, results) => {
      //       if (error) {
      //             res.send({
      //                   code: 403,
      //                   message: error,
      //             });
      //       } else {
      //             res.send({
      //                   code: 200,
      //                   message: results.rows,
      //             });
      //       }
      // });
});


// try {
//     new ExifImage({ image : 'jnpt.jpg' }, function (error, exifData) {
//         if (error)
//             console.log('Error: '+error.message);
//         else
//             console.log(exifData.gps['GPSLatitude'], exifData.gps['GPSLongitude']); // Do something with your data!
//     });
// } catch (error) {
//     console.log('Error: ' + error.message);
// }

module.exports = router;