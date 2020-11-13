const dotenv = require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const http = require('http').createServer(app);

const port = process.env.PORT || 3000;
const DIST_DIR = path.join(__dirname, '../dist');
const HTML_FILE = path.join(DIST_DIR, 'index.html');
const cors = require('cors');

const io = require('socket.io')(http);
const models = require('./db/models/dbindex');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(DIST_DIR));

/* DB Routes */
const { customerRouter } = require('./routes/customer');
const { barRouter } = require('./routes/bar');
const { ownerRouter } = require('./routes/owner');
const { partyRouter } = require('./routes/party');
const { imageRouter } = require('./routes/image');
const { pcRouter } = require('./routes/pc');
const { threadRouter } = require('./routes/thread');
const { messageRouter } = require('./routes/message');
const { cbRouter } = require('./routes/cb');
const { friendshipRouter } = require('./routes/friendship');
const { menuRouter } = require('./routes/menu');
const { eContactRouter } = require('./routes/eContact');
const { connected } = require('process');
const { mapRouter } = require('./routes/map');
const { gTranslateRouter } = require('./routes/gTranslate');
const { drinksRouter } = require('./routes/drinks');

app.use('/api/translate', gTranslateRouter);
app.use('/db/eContact', eContactRouter);
app.use('/db/customer', customerRouter);
app.use('/db/bar', barRouter);
app.use('/db/owner', ownerRouter);
app.use('/db/party', partyRouter);
app.use('/db/image', imageRouter);
app.use('/db/pc', pcRouter);
app.use('/db/thread', threadRouter);
app.use('/db/message', messageRouter);
app.use('/db/cb', cbRouter);
app.use('/db/friendship', friendshipRouter);
app.use('/db/menu', menuRouter);
app.use('/db/eContact', eContactRouter);
app.use('/db/maps', mapRouter);
app.use('/db/eContact', eContactRouter);
app.use('/db/drinks', drinksRouter);

app.get('/', (req, res) => {
  res.sendFile(HTML_FILE);
});

app.get('/token', (req, res) => {
  res.send('THIS IS WORKING');
});

// Database Connection
const connection = async () => {
  try {
    await models.sequelize.authenticate();
    console.info('Connection has been established successfully.');
  } catch (error) {
    console.warn('Unable to connect to the database:', error);
  }
};

const syncModels = async () => {
  try {
    await models.sequelize.sync();
    console.info('Models have been synced successfully.');
  } catch (error) {
    console.warn('Unable to sync models:', error);
  }
};

connection();
syncModels();

// SOCKETS
const connectedUsers = {};

io.on('connect', (socket) => {
  connectedUsers[socket.id] = socket.id;
  socket.emit('connection', null);

  socket.on('join', (room) => {
    socket.join(room);
  });

  socket.on('privateMessage', (message) => {
    io.to(message.room).emit('incomingPrivateMessage', message);
  });

  socket.on('sendMessage', (data) => {
    io.emit('newMessage', data);
  });
});

http.listen(port, () => {
  console.info(`App listening on port: ${port}`);
});
