const Model = require('../database/');

module.exports.getPlant = (cb) => {
  Model.Plant.find().exec((err, result) => {
    if (err) {
      cb(err)
    }
    cb(null, result)
  })
}

module.exports.postPlant = (plantData, cb) => {
  const query = { name: plantData.name }
  const update = plantData
  options = { upsert: true, new: true, setDefaultsOnInsert: true };

  Model.Plant.findOneAndUpdate(query, update, options, (err, result) => {
    if (err) {
      cb(err)
    }
    cb(null, result)
  })
}

module.exports.deletePlant = (id, cb) => {
  Model.Plant.findByIdAndDelete(id ,(err, result) => {
    if (err) {
      cb(err)
    }
    cb(null, result)
  })
}

module.exports.getGarden = (cb) => {
  Model.Garden.find().populate('plant').exec((err, result) => {
    if (err) {
      cb(err)
    }
    cb(null, result)
  })
}

module.exports.getGardenData = (params, cb) => {
  const query = { rowIdx: params.rowIdx, colIdx: params.colIdx }
  Model.Garden.find(query).populate('plant').exec((err, result) => {
    if (err) {
      cb(err)
    }
    cb(null, result)
  })
}

module.exports.postGarden = (gardenData, cb) => {
  Model.Garden.create(gardenData, (err, result) =>{
    if (err) {
      cb(err)
    }
    Model.Garden.findById(result._id).populate('plant').exec((err, result) => {
      if (err) {
        cb(err)
      }
      cb(null, result)
    })
  })
}

module.exports.deleteGarden = (id, cb) => {
  Model.Garden.findByIdAndDelete(id, (err, result) => {
    if (err) {
      cb(err)
    }
    cb(null, result)
  })
}
