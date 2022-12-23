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
personaSchema.virtual('competance').
  get(function() { return `${this.stats.competance.force} ${this.stats.competance.magique} ${this.stats.competance.endurance} ${this.stats.competance.agilite} ${this.stats.competance.chance}`; }).
  set(function(valeur) {
    // `valeur` est  la valeur modifier
    const force = valeur.substring(0, valeur.indexOf(' '));
    const magique = valeur.substring(valeur.indexOf(' ') + 1);
    const endurance = valeur.substring(valeur.indexOf(' ') + 1);
    const agilite = valeur.substring(valeur.indexOf(' ') + 1);
    const chance = valeur.substring(valeur.indexOf(' ') + 1);
    this.set({ force,magique,endurance,agilite,chance });
  });

personaSchema.virtual('faibless').
  get(function() { return `${this.stats.faibless.physique} ${this.stats.faibless.fusil} ${this.stats.faibless.feu} ${this.stats.faibless.glace} ${this.stats.faibless.electrique} ${this.stats.faibless.vent} ${this.stats.faibless.psychique} ${this.stats.faibless.nucleaire} ${this.stats.faibless.divin} ${this.stats.faibless.maledition}`; }).
  set(function(valeur) {
    // `valeur` est  la valeur modifier
    const physique = valeur.substring(0, valeur.indexOf(' '));
    const fusil = valeur.substring(valeur.indexOf(' ') + 1);
    const feu = valeur.substring(valeur.indexOf(' ') + 1);
    const glace = valeur.substring(valeur.indexOf(' ') + 1);
    const electrique = valeur.substring(valeur.indexOf(' ') + 1);
    const vent = valeur.substring(valeur.indexOf(' ') + 1);
    const psychique = valeur.substring(valeur.indexOf(' ') + 1);
    const nucleaire = valeur.substring(valeur.indexOf(' ') + 1);
    const divin = valeur.substring(valeur.indexOf(' ') + 1);
    const maledition = valeur.substring(valeur.indexOf(' ') + 1);
    this.set({ physique, fusil, feu, glace, electrique, vent, psychique, nucleaire, divin, maledition });
  });
//Exportation du modèle Auteur
module.exports = mongoose.model('Persona', PersonaSchema,'personas');

