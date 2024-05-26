const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

let id = 1;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/status', (request, response) => response.json({clients: clients.length}));
app.post('/syn', addSyn);
app.get('/events', eventsHandler);

function sendEventsToAll(newSyn) {
  clients.forEach(client => client.response.write(`data: ${JSON.stringify(newSyn, null, 2)}\n`))
}

async function addSyn(request, response, next) {
  const newSyn = request.body;
  syns.push(newSyn);
  response.json(newSyn)
  return sendEventsToAll(newSyn);
}

function eventsHandler(request, response, next) {
  const headers = {
    'Content-Type': 'text/event-stream',
    'Connection': 'keep-alive',
    'Cache-Control': 'no-cache'
  };
  response.writeHead(200, headers);

  const data = `data: ${JSON.stringify(syns)}\n\n`;

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

let clients = [];
let syns = [];

app.listen(PORT, () => {
  console.log(`Synth Events service listening at http://localhost:${PORT}`)
})
