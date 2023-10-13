import { Component } from '@angular/core';
import { OpenAiService } from '../services/open-ai.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  constructor(private openAi: OpenAiService) { }
  userMessage!: string;
  assistantReply!: string;
  chatMessage: { role: string, content: string }[] = [];

  sendMessage() {
    const userMessage = this.userMessage;
    this.chatMessage.push({ role: 'user', content: userMessage });
    this.openAi.senMessage(this.userMessage).subscribe(response => {
      this.assistantReply = response.reply;
      this.chatMessage.push({ role: 'assistant', content: this.assistantReply });
      this.userMessage = ''
    });
  }
}
