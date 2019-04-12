'use strict';

const express = require('express');
const cors = require('cors');

const { CLIENT_ORIGIN } = require('./config');
const routes = require('./routes');

const cats     = require('./cats');
const dogs     = require('./dogs');
const adopters = require('./adopters');

const app = express();

app.set('cats', cats);
app.set('dogs', dogs);
app.set('adopters', adopters);

app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);

app.use('/', routes);

// Catch-all Error handler
// Add NODE_ENV check to prevent stacktrace leak
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: app.get('env') === 'development' ? err : {}
  });
});

app.listen(8080,()=>{
  console.log('Serving on 8080');
});
