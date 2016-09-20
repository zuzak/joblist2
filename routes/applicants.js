var app = require('..')
var db = require('../database.js').init()

app.get('/', function (req, res) {
  res.render('applicants.pug', { applicants: db.getKeys(), db })
})
app.get('/applicant/:key', function (req, res) {
  var applicant = db.getRecord(req.params.key)
  if (applicant) {
    res.render('applicant.pug', { applicant })
  } else {
    res.status(404).render('404.pug') // there must be a better way
  }
})
