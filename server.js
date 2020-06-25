const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.listen(80, () => console.log('server is up'));
app.use(compression());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/isAlive', (req, res) => res.send(true));

app.use('/dev/', express.static(path.join(__dirname, './client'), {
	index: 'devIndex.html'
}));
app.use('/', express.static(path.join(__dirname, './client'), {
	index: 'index.html'
}));

