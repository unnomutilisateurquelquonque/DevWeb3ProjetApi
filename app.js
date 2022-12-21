var express = require('express');
var path = require('path');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const swaggerUI = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const swagger_options = {
  definition: {
      openapi: "3.0.0",
      info: {
          title: "API persona utilisé dans le cadre du projet final de DevWeb3",
          version: "1.0.0",
          description: "utilisé dans le cadre du projet final de Développement Web 3 à l'automne 2022",
      },
      servers: [
          {
              url: "http://localhost:3000",
          },
      ],
  },
  apis: ["./routes/*.js"],
};
const specs = swaggerJSDoc(swagger_options);

var indexRouter = require('./routes/index');
var personas = require('./routes/persona');

var app = express();

var cors = require('cors')

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/persona', personas);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

module.exports = app;

/*app.listen(4200, function () {
    console.log('CORS-enabled web server listening on port 4200')
  })*/
