var app = require('..')

app.use(function (err, req, res, next) {
  console.error(err.stack)
  // in production we shouldn't send the stack off to be rendered
  // but as this is never going to be in production, let's send it
  res.status(500).render('500.pug', {err})
})

// 404 must be the final route
app.use(function (req, res, next) {
  res.status(404).render('404.pug')
})
