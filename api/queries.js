var promise = require('bluebird');
// var ol = require('ol');
// var upload  = require('./upload');
// var feature = require('ol/Feature.js');
// var GeoJSON = require('ol/format/GeoJSON.js');
// var neoGeo = new GeoJSON();


var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
// var connectionString = 'postgres://postgres:admin@127.0.0.1:5432/sillemod'; // startrek is an example database name

 var connectionString = 'postgres://ltyxqxlmpqlxda:d79a1c41574ea4de04c32bd0b8036e41b46c0084c3239bec50f974ba902c80b8@ec2-54-247-119-167.eu-west-1.compute.amazonaws.com:5432/dbj2kp218m4779';
var db = pgp(connectionString);


/////////////////////
// Query Functions
/////////////////////

//get all object data
function getAllObject(req, res, next) {

  db.any('SELECT * FROM user_object')
    .then(function(data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved all Data'
        });
    })
    .catch(function(err) {
      return next(err);
    });
}
//insert object data
function testInsert(req, res, next) {
  var id = parseInt(req.body.id);

  db.none('INSERT INTO testtable(id, name)' +
      'values(${id}, ${name}', {
        "id": id,
        "name": req.body.name
      })
    .then(function() {
      res.status(200)
        .json({
          status: 'success',
          message: 'Object Inserted'
        });
    })
    .catch(function(err) {
      console.log("ERRRRRR");
      return next(err);
    })


};

//insert object data
function insertObjectDetails(req, res, next) {

  let location = JSON.stringify(req.body.geo_location);
  db.none('INSERT INTO user_object(name, geo_location, description)' +
      'values(${name}, ${geo_location}, ${description})', {
        "name": req.body.name,
        "geo_location": location,
        "description": req.body.description
      })
    .then(function() {
      res.status(200)
        .json({
          status: 'success',
          message: 'Object added'
        });
    })
    .catch(function(err) {
      console.log("ERRRRRR");
      return next(err);
    })
};


function singleObjectDetails(req, res, next) {
  var id = parseInt(req.params.id);
  db.one('SELECT * FROM user_object WHERE object_id = $1', id)
    .then(function(data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved one Object'
        });
    })
    .catch(function(err) {
      return next(err);
    });
}


// Delete object
function deleteObject(req, res, next) {
  var id = parseInt(req.params.id);
  db.result('DELETE FROM user_object WHERE object_id = $1', id)
    .then(function(result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: 'Object deleted'
        });
      /* jshint ignore:end */
    })
    .catch(function(err) {
      return next(err);
    });
}

function updateObjectDetails(req, res, next) {
  let location = JSON.stringify(req.body);
  let id = parseInt(req.params.id)
  db.none('UPDATE user_object SET geo_location=$1 where object_id=$2',
      [location, id])
    .then(function() {
      res.status(200)
        .json({
          status: 'success',
          message: 'Object details updated successfully!'
        });
    })
    .catch(function(err) {
      return next(err);
    });
}

// function createImage(req, res, next) {
//   let captionV = "Caption";
//   let img_pathV = "http////";
//
//   db.none('INSERT INTO img_upload(title, img_path, price, category, details)' +
//       'values(${title}, ${img_path},${price}, ${category},${details})', {
//         "title": req.body.title,
//         "img_path": req.file.path,
//         "price": req.body.price,
//         "category": req.body.category,
//         "details": req.body.details
//       })
//     .then(function() {
//       res.status(200)
//         .json({
//           status: 'success',
//           message: 'Image Inserted'
//         });
//     })
//     .catch(function(err) {
//       return next(err);
//     })
//
//
// };



// function getAllData(req, res, next) {
//   db.any('SELECT * FROM img_upload')
//     .then(function(data) {
//       res.status(200)
//         .json({
//           status: 'success',
//           data: data,
//           message: 'Retrieved all Data'
//         });
//     })
//     .catch(function(err) {
//       return next(err);
//     });
//
// }




// function getAllStarships(req, res, next) {
//   db.any('SELECT * FROM starships ORDER BY id DESC')
//     .then(function(data) {
//       res.status(200)
//         .json({
//           status: 'success',
//           data: data,
//           message: 'Retrieved all starships'
//         });
//     })
//     .catch(function(err) {
//       return next(err);
//     });
// }

// function getStarship(req, res, next) {
//   var id = parseInt(req.params.id);
//   db.one('SELECT * FROM starships WHERE id = $1', id)
//     .then(function(data) {
//       res.status(200)
//         .json({
//           status: 'success',
//           data: data,
//           message: 'Retrieved one starship'
//         });
//     })
//     .catch(function(err) {
//       return next(err);
//     });
// }

// function createStarship(req, res, next) {
//
//   req.body.launched = parseInt(req.body.launched);
//   // var fullPath = "files/"+req.file.filename;
//
//   db.none('INSERT INTO starships(name, registry, affiliation, launched, class, captain)' +
//       'values(${name}, ${registry}, ${affiliation}, ${launched}, ${class}, ${captain})',
//       req.body)
//     .then(function() {
//       res.status(200)
//         .json({
//           status: 'success',
//           message: 'Inserted one starship'
//         });
//     })
//     .catch(function(err) {
//       return next(err);
//     });
// }

// function updateStarship(req, res, next) {
//   db.none('UPDATE starships SET name=$1, registry=$2, affiliation=$3, launched=$4, class=$5, captain=$6 where id=$7', [req.body.name, req.body.registry, req.body.affiliation, parseInt(req.body.launched), req.body.class, parseInt(req.params.id)])
//     .then(function() {
//       res.status(200)
//         .json({
//           status: 'success',
//           message: 'Updated starship'
//         });
//     })
//     .catch(function(err) {
//       return next(err);
//     });
// }
//
// function removeStarship(req, res, next) {
//   var id = parseInt(req.params.id);
//   db.result('DELETE FROM starships WHERE id = $1', id)
//     .then(function(result) {
//       /* jshint ignore:start */
//       res.status(200)
//         .json({
//           status: 'success',
//           message: 'Removed ${result.rowCount} starships'
//         });
//       /* jshint ignore:end */
//     })
//     .catch(function(err) {
//       return next(err);
//     });
// }


/////////////
// Exports
/////////////

module.exports = {
  getAllObject: getAllObject,
  insertObjectDetails: insertObjectDetails,
  singleObjectDetails: singleObjectDetails,
  testInsert: testInsert,
  deleteObject: deleteObject,
  updateObjectDetails: updateObjectDetails
  // getAllStarships: getAllStarships,
  // getStarship: getStarship,
  // createStarship: createStarship,
  // updateStarship: updateStarship,
  // removeStarship: removeStarship,
  // createImage: createImage,
  // getAllData: getAllData
};