const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(__dirname + '/dist/licznik'));
app.get('/service-worker.js', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/dist/licznik/ngsw-worker.js'));
});
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/licznik/index.html'));
});

app.listen(3003);
