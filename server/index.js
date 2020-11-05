const express = require('express');
const path = require('path'); // NEW
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
// const googleAuth = require('./googleAuth');

const app = express();
const http = require('http').createServer(app);

const port = process.env.PORT || 3000;
const DIST_DIR = path.join(__dirname, '../dist'); // NEW
const HTML_FILE = path.join(DIST_DIR, 'index.html'); // NEW
const cors = require('cors');

const io = require('socket.io')(http);
const models = require('./db/models/dbindex');
// app.use(
//   cookieSession({
//     name: 'prost',
//     keys: [process.env.COOKIE_SESSION_KEY],
//   }),
// );
// app.use(passport.initialize());
// app.use(passport.session());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(DIST_DIR)); // NEW

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

app.use('/db/eContact', eContactRouter);
// app.use('/auth', auth);

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

app.get('/', (req, res) => {
  res.sendFile(HTML_FILE); // EDIT
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
    console.error('Unable to connect to the database:', error);
  }
};

const syncModels = async () => {
  try {
    await models.sequelize.sync();
    // await models.sequelize.sync({ force: true });
    console.info('Models have been synced successfully.');
  } catch (error) {
    console.error('Unable to sync models:', error);
  }
};

connection();
syncModels();

// SOCKETS WAHOO
const connectedUsers = {};

io.on('connect', (socket) => {
  console.info(`new client connected : ${socket.id}`);
  connectedUsers[socket.id] = socket.id;
  socket.emit('connection', null);

  socket.on('sendMessage', (data) => {
    console.info(data);
    // socket.broadcast.emit('newMessage', data)
    io.emit('newMessage', data);
  });
});

http.listen(port, () => {
  console.info(`App listening on port: ${port}`);
});
