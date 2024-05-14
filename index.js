const express = requre('express');

const app = express();
app.use(json());

const PORT = 3000;

app.listen((PORT) => {
  console.log(`Server listening on PORT ${PORT}`);
});

app.use('/users', UsersRoutes);
app.use('/messages', MessagesRoutes);
app.use('/channels', ChannelsRoutes);
