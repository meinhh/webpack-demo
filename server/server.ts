import express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import path from 'path';
import Cors from 'cors';

const app = express();
app.use(Cors());

const port = 3000 || process.env.PORT;
app.listen(port, () => console.log(`server is up on port ${port}`));
app.use(compression());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/isAlive', (req, res) => res.send(true));

app.use('/', express.static(path.join(__dirname, '..', '..', 'client', 'dist'), {
	index: 'index.html'
}));