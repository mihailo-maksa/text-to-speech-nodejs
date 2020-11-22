const express = require('express')
const Gtts = require('gtts')
const tmp = require('tmp')
const PORT = 8080 || process.env.PORT

const app = express()

app.use(express.json({ extended: true }))

// Save Method
const gtts = new Gtts('text to speak', 'en')
const tmpFile = tmp.fileSync().name + '.mp3'

gtts.save(tmpFile, (err, result) => {
  if (err) throw err
  console.log(`Success! Open file ${tmpFile} to hear the result.`)
})

// Stream Method
app.get('/stream', (req, res) => {
  const { text, lang } = req.query
  const gtts = new Gtts(text, lang)
  gtts.stream().pipe(res)
})

app.listen(PORT, (err) => {
  if (err) throw err
  console.log(`Server is running on port ${PORT}...`)
})
