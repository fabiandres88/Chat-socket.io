import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  socket: any;
  serverUrl = "http://localhost:3000";

  constructor() { 
    this.socket = io(this.serverUrl);
  }

  listen(eventName: String) {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data:any) => {
        subscriber.next(data);
      });
    });
  }

  emit(eventName: String, data:any) {
    this.socket.emit(eventName, data);
  }
}
