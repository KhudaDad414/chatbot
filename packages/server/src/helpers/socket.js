import server from '../server';
import messageHandler from '../controllers/message';

const API_KEY = 'XÆA-12';
const io = require('socket.io')(server);

const invalidMessage = 'You passed an invalid API KEY.';

let passedKey = null;
export default function startSocket() {
  io.on('connection', async (socket) => {
    console.log('ok');
    socket.on('signIn', (apiKey) => {
      console.log(apiKey);
      if (apiKey !== API_KEY) {
        io.to(socket.id).emit(
          'bot-message',
          invalidMessage,
        );
      } else {
        passedKey = apiKey;
        io.to(socket.id).emit(
          'bot-message',
          "Hello I'm Lukasz, I can help you out writing an AsyncAPI document.Try me!.",
        );
      }
    });
    socket.on('message', (data) => {
      if (passedKey !== API_KEY) {
        io.to(socket.id).emit('bot-message', invalidMessage);
      } else {
        messageHandler(data, socket, io);
      }
    });
  });
  io.on('disconnect', (evt) => {
    console.log('someone left');
  });
}
