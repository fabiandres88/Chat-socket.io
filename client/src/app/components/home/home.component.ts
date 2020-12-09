import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../../services/web-socket.service';
import { AuthenticationService } from '../../services/authentication.service';
import { MessageService } from '../../services/message.service';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  chatText:String = "";
  chatMessages: Array<any> = [];
  user: User;

  constructor(private webSocketService: WebSocketService, 
    private authenticationService: AuthenticationService,
    private messageService: MessageService) {
    this.user = this.authenticationService.currentUser;    
   }

  ngOnInit(){    
    this.messageService.getAll()
      .subscribe(messages => {
        this.chatMessages = messages;
      });

    this.webSocketService.listen("read-message")
      .subscribe((message) => {        
        this.chatMessages.push(message);
      });
  }

  sendMessage() {
    let message = {
      userId: this.user.id,      
      text: this.chatText
    };

    this.webSocketService.emit("send-message", message);
    this.chatText = "";    
  }
}
