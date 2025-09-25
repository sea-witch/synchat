const express = require('express')
const app = express()
const port = 3000

const pg = `<!doctype html>
<html>
  <head>
    <title>:)</title>
  </head>
  <body>
    <p>Ahhhhh.</p>
  </body>
</html>`

app.get('/', (req, res) => {
  res.send(pg)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
