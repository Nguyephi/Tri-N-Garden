const mongoose = require('mongoose');
const { Schema } = mongoose;

const plantSchema = new Schema({
  name: String,
  botanical_name: String,
  plant_type: String,
  sun_exposure: String,
  soil_type: String,
  soil_ph: String,
  best_start_season: String,
})

const gardenSchema = new Schema({
  plant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Plant"
  },
  rowIdx: Number,
  colIdx: Number,
  name: {
    type: String,
  },
  stage: {
    type: Number,
    default: 1,
    min: 1,
    max: 6
  },
  planted_on: {
    type: Date,
    default: new Date()
  }
})

module.exports = {
  plantSchema,
  gardenSchema
}