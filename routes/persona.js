require('dotenv').config();
var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const persona = require("../models/persona");

/* GET la liste des personas */
router.get('/', async (req, res) => {
  await mongoose.connect(process.env.DB_URI);
    try {
      const personas = await persona.find();
      res.json(personas);
  } catch(err) {
    console.log(err.message);
    res.status(500).json({erreur: "Une erreur est survenue, veuillez contacter votre administrateur"})
  } finally {
    mongoose.connection.close();
  }

});

router.post('/', async (req, res) => {
  await mongoose.connect(process.env.DB_URI);
    try {
        const persona = new persona(req.body);
        const personaAjouter = await persona.save();
        res.json(personaAjouter);
  } catch(err) {
    console.log(err.message);
    res.status(500).json({erreur: "Une erreur est survenue, veuillez contacter votre administrateur"})
  } finally {
    mongoose.connection.close();
  }
});

module.exports = router;
