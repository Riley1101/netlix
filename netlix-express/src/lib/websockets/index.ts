import WebSocket, { RawData } from "ws";
import type { RawType } from "../../types/websockets";
import { Room } from "./rooms";
import { Client } from "./client";

export function websocket(expressServer: any) {
  const clients: WebSocket[] = [];
  const rooms = new Map<string, Room>();

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
    console.log("New client connected");
    let newClient = new Client();
    newClient.setConnection(socket);
    rooms.set(newClient.id, new Room(newClient.id));
    socket.on("message", (message: RawData) => {
      const _raw: RawType = JSON.parse(message.toString());
      switch (_raw.payload.type) {
        case "create":
          break;
        case "join":
          let room = rooms.get(_raw.payload.room);
          room?.clients.forEach((client) => {
            const connection = client.getConnection();
            if (connection?.readyState) {
              connection?.send("New Client just connected");
            }
          });
          break;
        case "leave":
          break;
        default:
          let rom = rooms.get(_raw.payload.room);
          rom?.clients.forEach((client) => {
            const connection = client.getConnection();
            if (connection?.readyState) {
              connection?.send("New Client just connected");
            }
          });
          break;
      }
    });

    socket.on("close", () => {
      const index = clients.indexOf(socket);
      clients.splice(index, 1);
    });
  });

  return websocketServer;
}
