const express = require('express');
const database = require('./database/db');
const UsersRoutes = require('./routes/UsersRoutes');
const MessagesRoutes = require('./routes/MessagesRoutes');
const ChannelsRoutes = require('./routes/ChannelsRoutes');

const app = express();
app.use(express.json());

const db = database();

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});

app.use('/users', UsersRoutes);
app.use('/messages', MessagesRoutes);
app.use('/channels', ChannelsRoutes);
