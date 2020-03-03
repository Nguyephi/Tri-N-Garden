var mongoose = require('mongoose');
const Schema = require('./schema.js')
mongoose.connect('mongodb://localhost/triNGarden', {useNewUrlParser: true, useUnifiedTopology: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('Connected to Mongo')
});

const Plant = mongoose.model('Plant', Schema.plantSchema);

const Garden = mongoose.model('Garden', Schema.gardenSchema)


module.exports = {
  Plant,
  Garden
}