import WebSocket, { RawData } from "ws";
export function websocket(expressServer: any) {
  const clients: WebSocket[] = [];
  const websocketServer = new WebSocket.Server({
    noServer: true,
    path: "/chat",
  });
  // @ts-ignore
  expressServer.on("upgrade", (request, socket, head) => {
    websocketServer.handleUpgrade(request, socket, head, (socket) => {
      websocketServer.emit("connection", socket, request);
    });
  });
  websocketServer.on("connection", (socket) => {
    clients.push(socket);
    socket.on("message", (message: RawData) => {
      const msg = message.toString();
      websocketServer.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(msg);
        }
      });
    });
    socket.on("close", () => {
      const index = clients.indexOf(socket);
      clients.splice(index, 1);
    });
  });

  return websocketServer;
}
