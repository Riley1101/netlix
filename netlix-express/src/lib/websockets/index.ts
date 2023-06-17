import WebSocket, { RawData } from "ws";
import type { RawType } from "../../types/websockets";
import { Room } from "./rooms";
import { Client } from "./client";

export function websocket(expressServer: any) {
  const rooms = new Map<string, Room>();
  const websocketServer = new WebSocket.Server({
    noServer: true,
    path: "/chat",
  });

  function closeEmptyRoom(room: Room) {
    if (room.clients.length === 0) {
      console.log(room.id, "ROOM TO BE DELETED");
      rooms.delete(room.id);
      console.log(rooms, "ROOMS");
    }
  }

  function getRoom(id: string) {
    return rooms.get(id);
  }
  // @ts-ignore
  expressServer.on("upgrade", (request, socket, head) => {
    websocketServer.handleUpgrade(request, socket, head, (socket) => {
      websocketServer.emit("connection", socket, request);
    });
  });
  websocketServer.on("connection", (socket) => {
    let currentRoom: Room;
    let currentClient = new Client();
    console.log(rooms, "JOINED");
    socket.on("message", (message: RawData) => {
      const _raw: RawType = JSON.parse(message.toString());
      switch (_raw.payload.type) {
        case "create":
          let roomId = currentClient.id;
          currentClient.setConnection(socket);
          const newRoom = new Room(roomId);
          currentRoom = newRoom;
          newRoom.join(currentClient);
          rooms.set(currentClient.id, newRoom);
          socket.send(
            JSON.stringify({
              payload: {
                type: "create",
                room: roomId,
              },
              data: {
                message: "Hello Welcome from server",
                type: "message",
              },
            })
          );
          break;
        case "join":
          console.log(_raw, "JOIning");
          const { room: roomID } = _raw.payload;
          const room = getRoom(roomID);
          if (room) {
            console.log(room, "ROOM");
            currentClient.setConnection(socket);
            currentRoom = room;
            room.join(currentClient);
          } else {
            socket.send(
              JSON.stringify({
                payload: {
                  type: "error",
                  message: "Room not found",
                },
                data: null,
              })
            );
          }

          break;
        case "leave":
          break;
        default:
          break;
      }
    });

    socket.on("close", () => {
      if (currentRoom) {
        currentRoom.removeClient(currentClient.id);
        closeEmptyRoom(currentRoom);
      }
    });
  });

  return websocketServer;
}
