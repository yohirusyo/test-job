import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Public } from 'src/common/decorators';

@WebSocketGateway({
  path: '/api/ws',
  serveClient: false,
  cors: true,
})
export class SocketGateway {
  @WebSocketServer()
  server: Server;

  broadcast(message: any) {
    this.server.sockets.emit('parsing', message);
  }
}
