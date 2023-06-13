import uuid from "uuid";
import { Client } from "./client";

export class Room {
  name: string;
  id: string;
  clients: Client[] = [];
  constructor(name: string) {
    this.name = name;
    this.id = uuid.v4();
    this.clients = [];
  }
  join(client: Client) {
    this.clients.push(client);
  }
}

