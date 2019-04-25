const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
var busboy = require('connect-busboy');
var fs = require('fs');

const Pool = require('pg').Pool;
const pool = new Pool({
      user: 'jagz',
      host: 'localhost',
      database: 'weatherdb',
      password: '123456',
      port: 5432,
});

var weather = require('openweather-apis');

// const index = require('./routes/index.js');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(busboy());
// app.use('/', index);

const ExifImage = require('exif').ExifImage;

app.post('/storeImage', (req, res, next) => {
      var fstream;
      req.pipe(req.busboy);
      req.busboy.on('file', function (fieldname, file, filename) {
            console.log("Uploading: " + filename);
            fstream = fs.createWriteStream(__dirname + '/geo-tagged-images/' + filename);
            file.pipe(fstream);
            fstream.on('close', function () {
                  try {
                        new ExifImage({ image: `./geo-tagged-images/${filename}` }, function (error, exifData) {
                              if (error) {
                                    console.log('Error: ' + error.message);
                                    res.send({
                                          code: 403,
                                          message: `Your image information couldn't be extracted! Please try again later!`,
                                          error
                                    });
                              } 
                              else {
                                    console.log(exifData.gps);
                                    // console.log(exifData.gps['GPSLatitude'], exifData.gps['GPSLongitude']); // Do something with your data!
                                    let title = filename;
                                    let lat = exifData.gps['GPSLatitude'][0] + (exifData.gps['GPSLatitude'][1]/60) + (exifData.gps['GPSLatitude'][1]/3600);
                                    let long = exifData.gps['GPSLongitude'][0] + (exifData.gps['GPSLongitude'][1]/60) + (exifData.gps['GPSLongitude'][1]/3600);;
                                    let raster = 1234;
                                    pool.query(`INSERT INTO images (title, raster, lat, long) VALUES ('${title}', ${raster}, ${lat}, ${long})`, (error, results) => {
                                          if (error) {
                                                console.log("Error:", error);
                                                res.send({
                                                      code: 403,
                                                      message: `Your image wasn't stored properly! Please try again later!`,
                                                      error
                                                });
                                          } else {
                                                // console.log("Inserted successfully");

                                                // get weather data
                                                weather.setLang('en');
                                                weather.setCoordinate(lat, long);
                                                // weather.setCoordinate(18.895863, 72.976873);
                                                weather.setAPPID('dcdb3235cec4cab9c8397d8dc254c81b');
                                                weather.getAllWeather(function (err, JSONObj) {
                                                      if (err) {
                                                            res.send({
                                                                  code: 403,
                                                                  message: 'Oops! Sorry! Weather data not available! :(',
                                                            });
                                                      } else {
                                                            console.log(JSONObj);
                                                            res.send({
                                                                  code: 200,
                                                                  message: 'Weather data available',
                                                                  data: JSONObj
                                                            });
                                                      }                                                      
                                                });
                                                
                                          }
                                    });
                              }
                        });
                  } catch (error) {
                        console.log('Error: ' + error.message);
                  }
            });
      });
});

app.listen(3002);