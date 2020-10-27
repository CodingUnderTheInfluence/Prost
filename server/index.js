const express = require('express');
const path = require('path'); // NEW
const models = require('./db/models/dbindex');

const app = express();
const port = process.env.PORT || 3000;
const DIST_DIR = path.join(__dirname, '../dist'); // NEW
const HTML_FILE = path.join(DIST_DIR, 'index.html'); // NEW
const mockResponse = {
  foo: 'bar',
  bar: 'foo'
};
app.use(express.static(DIST_DIR)); // NEW
app.get('/api', (req, res) => {
  res.send(mockResponse);
});
app.get('/', (req, res) => {
 res.sendFile(HTML_FILE); // EDIT
});

// Database Connection
const connection = async () => {
  try {
    await models.sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

const syncModels = async () => {
  try {
    await models.sequelize.sync({force: true});
    console.log('Models have been synced successfully.');
  } catch (error) {
    console.error('Unable to sync models:', error);
  }
};

connection();
syncModels();

app.listen(port, function () {
  console.log('App listening on port: ' + port);
 });