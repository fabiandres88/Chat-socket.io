import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  url = "/api/messages";

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<any>(this.url)
        .pipe(map(messages => {
          return messages;
        }));
  }
}
