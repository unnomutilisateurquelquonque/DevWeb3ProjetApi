const { Int32, Decimal128, ObjectId, Timestamp } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PersonaSchema = new Schema(
  {
    lv: {type: Number},
    nom: {type: String},
    arcane: {type: String},
    stats:{
      competance:{
        force:{type: Number},
        magique:{type: Number},
        endurance:{type: Number},
        agilite:{type:Number},
        chance:{type:Number},
      },
      faibless:{
        physique:{type:String},
        fusil:{type:String},
        feu:{type:String},
        glace:{type:String},
        electrique:{type:String},
        vent:{type:String},
        psychique:{type:String},
        nucleaire:{type:String},
        divin:{type:String},
        maledition:{type:String},  
      },
    },
    obtenue: {type:Boolean},
    date:{type: Date},
  }
);
//Exportation du modèle Auteur
module.exports = mongoose.model('Persona', PersonaSchema,'personas');

