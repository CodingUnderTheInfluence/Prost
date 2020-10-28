const express = require('express');
const path = require('path'); // NEW
const models = require('./db/models/dbindex');
const dotenv = require('dotenv');

const app = express();
const port = process.env.PORT || 3000;
const DIST_DIR = path.join(__dirname, '../dist'); // NEW
const HTML_FILE = path.join(DIST_DIR, 'index.html'); // NEW
const mockResponse = {
  foo: 'bar',
  bar: 'foo'
};
app.use(express.static(DIST_DIR)); // NEW

/* DB Routes */
const { customerRouter } = require('./routes/customer');
app.use('/db/customer', customerRouter);
const { barRouter } = require('./routes/bar');
app.use('/db/bar', barRouter);
const { ownerRouter } = require('./routes/owner');
app.use('/db/owner', ownerRouter);
const { partyRouter } = require('./routes/party');
app.use('/db/party', partyRouter);
const { imageRouter } = require('./routes/image');
app.use('/db/image', imageRouter);
const { pcRouter } = require('./routes/pc');
app.use('/db/pc', pcRouter);
const { threadRouter } = require('./routes/thread');
app.use('/db/thread', threadRouter);
const { messageRouter } = require('./routes/message');
app.use('/db/message', messageRouter);
const { cbRouter } = require('./routes/cb');
app.use('/db/cb', cbRouter);
const { relationshipRouter } = require('./routes/relationship');
app.use('/db/relationship', relationshipRouter);
const { menuRouter } = require('./routes/menu');
app.use('/db/menu', menuRouter);
const { eContactRouter } = require('./routes/eContact');
app.use('/db/eContact', eContactRouter);

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
    await models.sequelize.sync({ force: true });
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