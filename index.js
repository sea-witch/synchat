const express = require('express')
const app = express()
const port = 3000

const msgs = ["hey", "you", "guys"]

const pg = (m) => `<!doctype html>
<html>
  <head>
    <title>:)</title>
  </head>
  <style>
	body {
		background: hotpink;
		color: green;
		font-size: 4rem;
	} 
  </style>
  <script src="https://cdn.jsdelivr.net/npm/htmx.org@2.0.7/dist/htmx.min.js" integrity="sha384-ZBXiYtYQ6hJ2Y0ZNoYuI+Nq5MqWBr+chMrS/RkXpNzQCApHEhOt2aY8EJgqwHLkJ" crossorigin="anonymous"></script>


  <body>
    <p id="msg">Ahhhhh.</p>
<div>
${m}
</div>
  </body>
</html>`

app.get('/', (req, res) => {
	const msgString = msgs.join("~")
  res.send(pg(msgString))
})

app.post('/clicked', (req, res) => {
  res.send('yupp')
})

app.get("/msg/:m", (req, res) => {
const m = req.params.m
msgs.push(m)
res.send('ok')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
