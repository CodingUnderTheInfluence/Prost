const { lavender } = require('color-name');
const express = require('express');
const path = require('path'); // NEW
const passport = require('passport');
const bodyParser = require('body-parser');
const models = require('./db/models/dbindex');
const dotenv = require('dotenv');

const auth = require('./auth/authroute');
const app = express();
const port = process.env.PORT || 3000;
const DIST_DIR = path.join(__dirname, '../dist'); // NEW
const HTML_FILE = path.join(DIST_DIR, 'index.html'); // NEW
const cookieSession = require('cookie-session');
const cors = require('cors');
require('./auth/custSignIn');
require('./auth/ownerSignIn');

const mockResponse = {
  foo: 'bar',
  bar: 'foo'
};
app.use(cors());
app.use(
  cookieSession({
    name: 'prost',
    keys: [process.env.COOKIE_SESSION_KEY],
  }),
);
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
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
app.use('/auth', auth);

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
<<<<<<< HEAD
    // await models.sequelize.sync({ force: true });
=======
    // await models.sequelize.sync({force: true});
>>>>>>> 001f8ef... (add) all files to my forkl
    await models.sequelize.sync();
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