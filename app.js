const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const { router } = require('./src/routes/router');
const apiErrorHandler = require('./src/middlewares/errorHandler');

const port = process.env.PORT;

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());

app.use(router);

app.use(apiErrorHandler);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
