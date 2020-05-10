require('dotenv').config();
const express = require('express');
const timeout = require('connect-timeout');
const cors = require('cors');

const app = express();
app.use(timeout('60s'));
app.use(express.json());
app.use(cors());
app.use(haltOnTimedout)

app.use('/api', require('./src/routes'));
app.use(haltOnTimedout);

function haltOnTimedout (req, res, next) {
  if (!req.timedout) next()
}

app.listen(process.env.PORT || 3001);