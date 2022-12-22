const { Int32, Decimal128, ObjectId, Timestamp } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PersonaSchema = new Schema(
  {
    lv: {type: Number},
    nom: {type: String,required:true, maxLength: 20,postMessage:"la valeur ne doit pas dépassé 20 charactère"},
    arcane: {type: String,required:true, maxLength: 12,postMessage:"la valeur ne doit pas dépassé 12 charactère"},
    stats:{
      competance:{
        force:{type: Number,required:true,maxValue:99,minValue:1,postMessage:"la valeur doit être entre 1 et 99"},
        magique:{type: Number,required:true,maxValue:99,minValue:1,postMessage:"la valeur doit être entre 1 et 99"},
        endurance:{type: Number,required:true,maxValue:99,minValue:1,postMessage:"la valeur doit être entre 1 et 99"},
        agilite:{type:Number,required:true,maxValue:99,minValue:1,postMessage:"la valeur doit être entre 1 et 99"},
        chance:{type:Number,required:true,maxValue:99,minValue:1,postMessage:"la valeur doit être entre 1 et 99"},
      },
      faibless:{
        physique:{type:String,maxLength: 10,postMessage:"la valeur ne doit pas dépassé 10 charactère"},
        fusil:{type:String,maxLength: 10,postMessage:"la valeur ne doit pas dépassé 10 charactère"},
        feu:{type:String,maxLength: 10,postMessage:"la valeur ne doit pas dépassé 10 charactère"},
        glace:{type:String,maxLength: 10,postMessage:"la valeur ne doit pas dépassé 10 charactère"},
        electrique:{type:String,maxLength: 10,postMessage:"la valeur ne doit pas dépassé 10 charactère"},
        vent:{type:String,maxLength: 10,postMessage:"la valeur ne doit pas dépassé 10 charactère"},
        psychique:{type:String,maxLength: 10,postMessage:"la valeur ne doit pas dépassé 10 charactère"},
        nucleaire:{type:String,maxLength: 10,postMessage:"la valeur ne doit pas dépassé 10 charactère"},
        divin:{type:String,maxLength: 10,postMessage:"la valeur ne doit pas dépassé 10 charactère"},
        maledition:{type:String,maxLength: 10,postMessage:"la valeur ne doit pas dépassé 10 charactère"},  
      },
    },
    obtenue: {type:Boolean,required:true,postMessage:"la valeur est requise"},
    date:{type: Date,required:true,postMessage:"la valeur est requise"},
  }
);
//Exportation du modèle Auteur
module.exports = mongoose.model('Persona', PersonaSchema,'personas');

