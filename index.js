const express = require('express')
const app = express()
const port = 3000

const pg = `<!doctype html>
<html>
  <head>
    <title>This is the title of the webpage!</title>
  </head>
  <body>
    <p>This is an example paragraph. Anything in the <strong>body</strong> tag will appear on the page, just like this <strong>p</strong> tag and its contents.</p>
  </body>
</html>`

app.get('/', (req, res) => {
	
  res.send(JSON.stringify('blurghhh'))
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
