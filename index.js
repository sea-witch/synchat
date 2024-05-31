const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

let id = 1;
let clients = [];
let syns = [];

app.use(cors());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({extended: false}));

app.use("/", express.static(__dirname + "/public"));
app.get('/status', (request, response) => response.json({clients: clients.length}));
app.post('/syn', addSyn);
app.get('/events', eventsHandler);
app.get('/reset', resetHandler);

function resetHandler() {
  syns = [];
}

function sendEventsToAll(newSyn) {
  clients.forEach(client => client.response.write(`event: ping\ndata: ${newSyn}\n\n`))
}

async function addSyn(request, response) {
  const newSyn = request.body;
  syns.push(newSyn);
  response.send(newSyn)
  return sendEventsToAll(newSyn);
}

function eventsHandler(request, response) {
  const headers = {
    'Content-Type': 'text/event-stream',
    'Connection': 'keep-alive',
    'Cache-Control': 'no-cache'
  };
  response.writeHead(200, headers);

  const data = `data: ${syns.join(" * ")}\n\n`;

  response.write(data);

  const clientId = id++;

  const newClient = {
    id: clientId,
    response
  };

  clients.push(newClient);

  request.on('close', () => {
    console.log(`${clientId} Connection closed`);
    clients = clients.filter(client => client.id !== clientId);
  });
}

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Synth Events service listening at http://localhost:${PORT}`)
})
