import { addChat } from "./controller/chat.js";

 const storeSocketRedis = (io, socket, redisClient) => {
    // lưu email của người nhận vào redis
  socket.on('register', (email) => {
    redisClient.set(email, socket.id); //set socket.id vào email của người nhận vào redis
    console.log(`User ${email} registered with socket ID ${socket.id}`);
  });
    // người gửi gửi message và đưa message cho người nhận
    socket.on('typing', (data) => {
      const { recipient, sender } = data;
      // console.log( 'người nhận:' , recipient, 'người gửi:', sender )
      // tìm và lấy socket.id của người nhận thông qua email(email) đã lưu trong redis
      redisClient.get(recipient, (err, SocketId) => {
        if (err) {
          console.error('Redis error:', err);
          return;
        }
        if (SocketId) {
          //gửi data message cho bản thân và người nhận để render list message
          io.to(SocketId).emit('receive-typing', true);
        } else {
          console.log(`User ${recipient} is not connected`);
        }
      });
    });
  // người gửi gửi message và đưa message cho người nhận
  socket.on('send-message', async (data) => {
    const { message, recipient, sender } = data;
    await addChat(data) // insert dữ liệu vào mongodb
    // console.log(' message:', message, 'người nhận:' , recipient, 'người gửi:', sender )
    // tìm và lấy socket.id của người nhận thông qua email(email) đã lưu trong redis
    redisClient.get(recipient, (err, SocketId) => {
      if (err) {
        console.error('Redis error:', err);
        return;
      }
      if (SocketId) {
        //gửi data message cho bản thân và người nhận để render list message
        io.to(SocketId).emit('receive-message', { message, recipient: sender, sender: sender });
        io.to(socket.id).emit('receive-message', { message, recipient: recipient, sender: sender });
      } else {
        console.log(`User ${recipient} is not connected`);
      }
    });
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
}
export default storeSocketRedis