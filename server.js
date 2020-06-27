const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const port = 3000 || process.env.PORT;
app.listen(port, () => console.log(`server is up on port ${port}`));
app.use(compression());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/isAlive', (req, res) => res.send(true));

app.use('/', express.static(path.join(__dirname, './client/dist'), {
	index: 'index.html'
}));