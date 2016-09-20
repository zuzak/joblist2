var express = require('express') // web server
var sass = require('node-sass-middleware') // CSS compiler
var path = require('path') // (core)
var app = module.exports = express()

app.set('view engine', 'pug')
app.locals.pretty = true // don't minify HTML

// compile CSS from SASS
app.use(sass({
  src: path.join(__dirname, 'public'),
  includePaths: [
    path.join(__dirname, 'node_modules', 'govuk-elements-sass', 'public', 'sass'),
    path.join(__dirname, 'node_modules', 'govuk_frontend_toolkit', 'stylesheets')
  ]
}))
// serve it
app.use('/', express.static(path.join(__dirname, 'public')))
// serve icons too
app.use('/', express.static(path.join(__dirname, 'node_modules', 'govuk_frontend_toolkit', 'images')))

// serve routes :)
require('./routes') // is this portable?

if (app.get('env') === 'test') {
  // make it easier to develop and test at the same time
  app.listen(8080)
} else {
  app.listen(3000) // seems standard for node apps
}
