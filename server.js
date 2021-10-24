require('dotenv').config()


const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();

const port = process.env.APP_PORT || 8083;
const host = process.env.APP_HOST || '127.0.0.1';

const router = require('./server/routes/product.routes');

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', router);

//levantando server
app.listen(port, host); 

console.log(`Ejecutando servidor en ${host}:${port}`);