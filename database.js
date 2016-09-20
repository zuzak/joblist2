/**
 * This is a really lightweight app; the data isn't changing nor complex
 * so let's cheat and use a JSON file instead of a "real" database
 *
 * We'll pretend to be a database though, for the sake of it
 */
var path = require('path')

module.exports = {
  data: {},
  getRecord: function (pk) {
    return this.data[pk]
  },
  getKeys: function () {
    return Object.keys(this.data)
  },
  loadData: function (file) {
    if (!file) {
      file = path.join(__dirname, 'data/applicants.json')
    }
    // you can import JSON via require()
    // I guess I could use fs.readFile() instead
    this.data = require(file)
  },
  init: function (file) {
    this.loadData(file)
    return this
  }
}
