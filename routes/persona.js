require('dotenv').config();
var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const persona = require("../models/persona");

/**
 * @openapi
 * components:
 *   schemas:
 *     Persona:
 *       type: object
 *       required:
 *         - lv
 *         - nom
 *         - arcane
 *         - date
 *         - obtenue
 *       properties:
 *         _id:
 *           type: string
 *           description: identifiant de l'enregistrement
 *         nom:
 *           type: string
 *           description: nom de la persona
 *         lv:
 *           type: number
 *           description: niveau de la persona
 *         arcane:
 *           type: string
 *           description: arcane de la persona
 *         stats: 
 *            type : array
 *            items:
 *              $ref: '#/components/schemas/stats'
 *         obtenue:
 *           type: boolean
 *           description: si l'usager a obtenue la persona
 *         date:
 *           type: date
 *           description: date d'ajout
 *       example:
 *        stats: [{"competance":[{"force": 1,"magique": 1,"endurance": 1,"agilite": 1,"chance": 1}]},{"faibless": [{"physique": "","fusil": "","feu": "faible","glace": "","electrique": "","vent": "absorbe","psychique": "","nucleaire": "resistant","divin": "","maledition": "nullifie",}]}]
 *        _id: "63934d9e399d907afc862293"
 *        lv: 1
 *        nom: "Une persona"
 *        arcane: "arcane"
 *        obtenue: "true"
 *        date: "2000-01-01T00:00:00.000Z"
 *     stats:
 *       properties:
 *         competance:
 *            type : array
 *            items:
 *              $ref: '#/components/schemas/competance'
 *         faibless:
 *            type : array
 *            items:
 *              $ref: '#/components/schemas/faibless'
 *     competance:
 *       properties:
 *         force:
 *           type: number
 *           description: force de la persona
 *         magique:
 *           type: number
 *           description: magie de la persona
 *         endurance:
 *           type: number
 *           description: endurance de la persona
 *         agilite:
 *           type: number
 *           description: agilite de la persona
 *         chance: 
 *           type: number
 *           description: chance de la persona
 *     faibless:
 *       properties:
 *         physique:
 *           type: string
 *           description: faibless physique de la persona
 *         fusil:
 *           type: string
 *           description: faibless fusil de la persona
 *         feu:
 *           type: string
 *           description: faibless feu de la persona
 *         glace:
 *           type: string
 *           description: faibless glace de la persona
 *         electrique: 
 *           type: string
 *           description: faibless electrique de la persona
 *         vent: 
 *           type: string
 *           description: faibless vent de la persona
 *         psychique: 
 *           type: string
 *           description: faibless psychique de la persona
 *         nucleaire: 
 *           type: string
 *           description: faibless nucleaire de la persona
 *         divin: 
 *           type: string
 *           description: faibless divin de la persona
 *         maledition: 
 *           type: string
 *           description: faibless maledition de la persona
 *     groupArcane:
 *       properties:
 *         arcane:
 *            type : string
 *            description: arcane choisie
 *         count:
 *            type : number
 *            description: numbre d'arcane du type choisie
 *       example:
 *         arcane: "arcane"
 *         count: 17
 *     groupObtenue:
 *       properties:
 *         obtenue:
 *            type : boolean
 *            description: obtenue ou non
 *         count:
 *            type : number
 *            description: numbre d'arcane du type choisie
 *       example:
 *         obtenue: "true"
 *         count: 45
 */


/**
 * @openapi
 * /personas:
 *   get:
 *     tags:
 *        - personas
 *     description: Permet d'obtenir la liste des personas
 *     responses:
 *      '200':
 *        description: Tableau des persona
 *        content: 
 *          application/json:
 *            schema: 
 *                type: array
 *                items:
 *                    $ref: '#/components/schemas/Persona'
 *      '500':
 *        description: Une erreur est survenue
 */

//Get tout les personas
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

/**
 * @openapi
 * /personas/:id:
 *   get:
 *     tags:
 *        - personas/:id
 *     description: Permet d'obtenir une persona avec un id specifique
 *     parameters:
 *      - id: id
 *        in: path
 *        required: true
 *        description: le id de la persona a récupéré
 *        schema:
 *          type: string
 *     responses:
 *      '200':
 *        description: Tableau des persona
 *        content: 
 *          application/json:
 *            schema: 
 *                type: array
 *                items:
 *                    $ref: '#/components/schemas/Persona'
 *      '500':
 *        description: Une erreur est survenue
 */

/* GET une persona par id */
router.get('/:id', async (req, res) => {
  await mongoose.connect(process.env.DB_URI);
    try {
      const personas = await persona.findById(req.params.id);
      res.json(personas);
  } catch(err) {
    console.log(err.message);
    res.status(500).json({erreur: "Une erreur est survenue, veuillez contacter votre administrateur"})
  } finally {
    mongoose.connection.close();
  }
});

/**
 * @openapi
 * /personas/:lvMin/:lvMax:
 *   get:
 *     tags:
 *        - personas/:lvMin/:lvMax
 *     description: Permet d'obtenir les personas entre deux niveux choisie
 *     parameters:
 *      - lvMin: lvMin
 *        in: path
 *        required: true
 *        description: le niveau minimal rechercher
 *        schema:
 *          type: number
 *      - lvMax: lvMax
 *        in: path
 *        required: true
 *        description: le niveau maximal rechercher
 *        schema:
 *          type: number
 *     responses:
 *      '200':
 *        description: Tableau des persona
 *        content: 
 *          application/json:
 *            schema: 
 *                type: array
 *                items:
 *                    $ref: '#/components/schemas/Persona'
 *      '500':
 *        description: Une erreur est survenue
 */

/* GET la liste des personas entre deux lv*/
router.get('/:lvMin/:lvMax', async (req, res) => {
  let lvMin = parseInt(req.params.lvMin);
  let lvMax = parseInt(req.params.lvMax);
  await mongoose.connect(process.env.DB_URI);
    try {
      const personas = await persona.aggregate([
        {
          $match: { lv: { $gte: lvMin, $lte: lvMax } }
        },
        {
          $sort: { lv:1}
        }
      ]);
      res.json(personas);
  } catch(err) {
    console.log(err.message);
    res.status(500).json({erreur: "Une erreur est survenue, veuillez contacter votre administrateur"})
  } finally {
    mongoose.connection.close();
  }
});

/**
 * @openapi
 * /personas/arcane/:arcance:
 *   get:
 *     tags:
 *        - personas/arcane/:arcace
 *     description: affiche le nombre de persona de l'arcane choise
 *     parameters:
 *      - arcane: arcane
 *        in: path
 *        required: true
 *        description: l'arcane a compter
 *        schema:
 *          type: string
 *     responses:
 *      '200':
 *        description: Tableau arcane
 *        content: 
 *          application/json:
 *            schema: 
 *                type: array
 *                items:
 *                    $ref: '#/components/schemas/groupArcane'
 *      '500':
 *        description: Une erreur est survenue
 */

/* GET compte le noubre de persona d'une arcane */
router.get('/arcane/:arcane', async (req, res) => {
  let Larcane = req.params.arcane;
  await mongoose.connect(process.env.DB_URI);
    try {
      const personas = await persona.aggregate([
        {
          $group: { _id: Larcane, count: { $sum: 1 } } 
        }
      ]);
      res.json(personas);
  } catch(err) {
    console.log(err.message);
    res.status(500).json({erreur: "Une erreur est survenue, veuillez contacter votre administrateur"})
  } finally {
    mongoose.connection.close();
  }
});


/**
 * @openapi
 * /personas/arcanes/:arcance:
 *   get:
 *     tags:
 *        - personas/arcanes/:arcace
 *     description: affiche les personas de l'arcane choisie
 *     parameters:
 *      - arcane: arcane
 *        in: path
 *        required: true
 *        description: l'arcane a compter
 *        schema:
 *          type: string
 *     responses:
 *      '200':
 *        description: Tableau arcane
 *        content: 
 *          application/json:
 *            schema: 
 *                type: array
 *                items:
 *                    $ref: '#/components/schemas/groupArcane'
 *      '500':
 *        description: Une erreur est survenue
 */

/* GET compte le noubre de persona d'une arcane */
router.get('/arcanes/:arcane', async (req, res) => {
  let Larcane = req.params.arcane;
  await mongoose.connect(process.env.DB_URI);
    try {
      const personas = await persona.find(persona.arcane = Larcane);
      res.json(personas);
  } catch(err) {
    console.log(err.message);
    res.status(500).json({erreur: "Une erreur est survenue, veuillez contacter votre administrateur"})
  } finally {
    mongoose.connection.close();
  }
});

/**
 * @openapi
 * /personas/obtenue/:obtenue:
 *   get:
 *     tags:
 *        - personas/obtenue/:obtenue
 *     description: affiche le nombre de persona obtenue ou non
 *     parameters:
 *      - obtenue: obtenue
 *        in: path
 *        required: true
 *        description: compte le nombre de persona obtenue ou non selon la valeur d'obtenue
 *        schema:
 *          type: boolean
 *     responses:
 *      '200':
 *        description: Tableau arcane
 *        content: 
 *          application/json:
 *            schema: 
 *                type: array
 *                items:
 *                    $ref: '#/components/schemas/groupObtenue'
 *      '500':
 *        description: Une erreur est survenue
 */

/* GET compte le noubre de persona d'une arcane */
router.get('/obtenue/:obtenueTotal', async (req, res) => {
  let obtenueTotal = (req.params.obtenueTotal =="true");
  console.log(obtenueTotal);
  await mongoose.connect(process.env.DB_URI);
    try {
      const personas = await persona.aggregate([
        {
          $group: { _id: obtenueTotal, count: { $sum: 1 } } 
        }
      ]);
      res.json(personas);
  } catch(err) {
    console.log(err.message);
    res.status(500).json({erreur: "Une erreur est survenue, veuillez contacter votre administrateur"})
  } finally {
    mongoose.connection.close();
  }
});


/**
 * @openapi
 * /personas:
 *   post:
 *     tags:
 *        - personas
 *     description: affiche le nombre de persona obtenue ou non
 *     responses:
 *      '200':
 *        description: persona enregistré
 *        content: 
 *          application/json:
 *            schema: 
 *                type: array
 *                items:
 *                    $ref: '#/components/schemas/Persona'
 *      '500':
 *        description: Une erreur est survenue lors de l'ajout
 */

//Post 
router.post('/', async (req, res) => {
  await mongoose.connect(process.env.DB_URI);
    try {
        const nouvellepersona = new persona(req.body);
        const personaAjouter = await nouvellepersona.save();
        res.json(personaAjouter);
  } catch(err) {
    console.log(err.message);
    res.status(500).json({erreur: "Une erreur est survenue lors de l'ajout"})
  } finally {
    mongoose.connection.close();
  }
});



/**
 * @openapi
 * /personas:
 *   put:
 *     tags:
 *        - personas
 *     description: affiche le nombre de persona obtenue ou non
 *     parameters:
 *      - id: id
 *        in: path
 *        required: true
 *        description: entifiant de la persona
 *        schema:
 *          type: string
 *     responses:
 *      '200':
 *        description: modifie une persona avec l id
 *        content: 
 *          application/json:
 *            schema: 
 *                type: array
 *                items:
 *                    $ref: '#/components/schemas/Persona'
 *      '500':
 *        description: Une erreur est survenue lors de la modification
 */

/*Put*/ 
router.put('/:id', async (req, res) => {
  await mongoose.connect(process.env.DB_URI);
    try {
        const {id} = req.params
        const personaModifier = await persona.updateOne({id},req.body);
        res.json(personaModifier);
  } catch(err) {
    console.log(err.message);
    res.status(500).json({erreur: "Une erreur est survenue lors de la modification"})
  } finally {
    mongoose.connection.close();
  }
});

/**
 * @openapi
 * /personas:
 *   delete:
 *     tags:
 *        - personas
 *     description: delete une persona avec l'id choisie
 *     parameters:
 *      - id: id
 *        in: path
 *        required: true
 *        description: entifiant de la persona
 *        schema:
 *          type: string
 *     responses:
 *      '200':
 *        description: suppression complété
 *        content: 
 *          application/json:
 *            schema: 
 *                type: array
 *                items:
 *                    $ref: '#/components/schemas/Persona'
 *      '500':
 *        description: Une erreur est survenue lors de la suppression
 */

/* supprime une persona */
router.delete('/:id', async (req, res) => {
  await mongoose.connect(process.env.DB_URI);
  try {
      const personaSupprimer = await persona.findByIdAndDelete(req.params.id);
      res.json(personaSupprimer);
} catch(err) {
  console.log(err.message);
  res.status(500).json({erreur: "Une erreur est survenue lors de la suppression"})
} finally {
  mongoose.connection.close();
}
});

module.exports = router;
