const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('<body style="font-size: 5rem; color: hotpink; background: black;"><pre>synchat<pre></body>')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
