import { v4 as uuidv4 } from "uuid";
import { Client } from "./client";

export class Room {
  name: string;
  id: string;
  clients: Client[] = [];
  constructor(name: string) {
    this.name = name;
    this.id = name;
    this.clients = [];
  }
  join(client: Client) {
    this.clients.push(client);
  }
  removeClient(id: string) {
    this.clients = this.clients.filter((client) => client.id !== id);
  }
}
