const express = require('express');
const webstomp = require('webstomp-client');
const WebSocket = require('ws');

const client = webstomp.over(new WebSocket('http://localhost:15674/ws'));
const app = express();
const port = 3002;

function onError(user, err) {
    console.log('Disconnected', user.name, err);
}

let message = 'Hello RabbitMQ';
function onConnect(user) {
    console.log('Connected', user.name);
    client.send('/exchange/web-service-endpoint', message, { 'content-type': 'text/plain' });
}

client.connect('guest', 'guest', onConnect, onError);

app.listen(port, () => console.log(`App listening on port ${port}!`));