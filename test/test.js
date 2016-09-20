/* eslint-env mocha */
/**
 * These are mostly just smoke tests
 */
var app = require('..')

require('should')
var path = require('path') // (core)
var request = require('supertest')
var unlink = require('fs').readFileSync // (core)

describe('routes', function () {
  it('should 404 on non-existent', function (done) {
    request(app)
      .get('/404')
      .expect(404, done)
  })
  it('should 404 with some pretty HTML', function (done) {
    request(app)
      .get('/404')
      .end(function (err, res) {
        if (err) throw err
        res.text.should.containEql('<!DOCTYPE html>')
        res.text.should.containEql('Not Found')
        done()
      })
  })
})

describe('stylesheet compilation', function () {
  before(function () {
    try {
      // rm to ensure that we're not just passing through
      unlink(path.join(__dirname, 'public', 'index.css')) // Scary!
    } catch (e) {
      if (e.code === 'ENOENT') { // file already gone
        return
      }
      throw e
    }
  })
  it('should compile and display CSS', function (done) {
    request(app)
      .get('/index.css')
      .expect(200, done)
  })
})

describe('templating language compilation', function () {
  it('should render pug', function (done) {
    request(app)
      .get('/')
      .end(function (err, res) {
        if (err) throw err
        // check for string that is only in an unbuffered comment
        res.text.should.not.containEql('squeamish ossifrage')
        done()
      })
  })
})

describe('applicant listings', function () {
  it('displays something with a real applicant', function (done) {
    request(app)
      .get('/applicant/0')
      .expect(200, done)
  })
  it('404s when no applicant exists', function (done) {
    request(app)
      .get('/applicant/-1')
      .expect(404, done)
  })
  it('displays the applicant name somewhere on the listing', function (done) {
    request(app)
      .get('/applicant/0')
      .end(function (err, res) {
        if (err) throw err
        res.text.should.containEql('Gaston')
        res.text.should.containEql('Leroux')
        done()
      })
  })
  it('displays the applicant experience somewhere on the listing', function (done) {
    request(app)
      .get('/applicant/0')
      .end(function (err, res) {
        if (err) throw err
        res.text.should.containEql('Christine Daae')
        res.text.should.containEql('Opera')
        res.text.should.containEql('story')
        done()
      })
  })
})
describe('applicants list', function () {
  it('displays something', function (done) {
    request(app)
      .get('/')
      .expect(200, done)
  })
  it('displays some applicants', function (done) {
    request(app)
      .get('/')
      .end(function (err, res) {
        if (err) throw err
        res.text.should.containEql('Buchan')
        res.text.should.containEql('Dumas')
        res.text.should.containEql('Leroux')
        done()
      })
  })
})
