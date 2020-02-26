const {Schema, model} = require('mongoose')

const schema = new Schema({
  title: {type: String, required: true, unique: true},
  date: {type: Date, default: Date.now}
})

module.exports = model('Note', schema)