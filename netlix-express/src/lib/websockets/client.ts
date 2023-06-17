import WebSocket from "ws";
import { v4 as uuidv4 } from 'uuid';

export class Client {
  public id: string;
  public name: string;
  private connection?: WebSocket;
  constructor(name?: string) {
    this.id = uuidv4();
    this.name = name ? name : this._generateName();
    this.connection = undefined;
  }
  private _generateName() {
    return Math.random().toString(36).substring(2, 15);
  }
  public setConnection(connection: WebSocket) {
    this.connection = connection;
  }
  public getConnection() {
    return this.connection;
  }
}
