const express = require('express')
const config = require('config')
const mongoose = require('mongoose')

const app = express()
app.use(express.json({ extended: true }))

app.use('/api/note', require('./routes/note.routes'))

const PORT = config.get('port') || 4000

const startDb = async () => {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
  } catch (e) {
    console.log('Database server error')
    process.exit(1)
  }
}

startDb()
  .then(
    () => console.log('Successfully connected to DB')
  )

app.listen(PORT, () => console.log(`App has been started on port ${PORT}`))