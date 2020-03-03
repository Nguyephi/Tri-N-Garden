require ('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const Models = require('./models/')


const app = express();

app.use(express.static('./client/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/api/plant', (req, res) => {
  Models.getPlant((err, result) => {
    if (err) {
      res.status(400).send(err)
    }
    res.status(200).send(result)
  })
});

app.post('/api/plant', (req, res) => {
  Models.postPlant(req.body, (err, result) => {
    if (err) {
      res.status(400).send(err)
    }
    res.status(200).send(result)
  })
})

app.delete('/api/plant/:id', (req, res) => {
  Models.deletePlant(req.params.id, (err, result) => {
    if (err) {
      res.status(400).send(err)
    }
    res.status(200).send(result)
  })
})

app.get('/api/garden', (req, res) => {
  Models.getGarden((err, result) => {
    if (err) {
      res.status(400).send(err)
    }
    res.status(200).send(result)
  })
});

app.get('/api/garden/:rowIdx/:colIdx', (req, res) => {
  Models.getGardenData(req.params, (err, result) => {
    if (err) {
      res.status(400).send(err)
    }
    res.status(200).send(result)
  })
});

app.post('/api/garden', (req, res) => {
  Models.postGarden(req.body, (err, result) => {
    if (err) {
      res.status(400).send(err)
    }
    res.status(200).send(result)
  })
})

app.delete('/api/garden/:id', (req, res) => {
  Models.deleteGarden(req.params.id, (err, result) => {
    if (err) {
      res.status(400).send(err)
    }
    res.status(200).send(result)
  })
})

module.exports = app;