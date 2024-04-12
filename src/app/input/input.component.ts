import { Component } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {
  userInput: string = '';
  encryptedMessage: string = '';
  halfLength: number = 0;

  encryptMessage(): void {
    if (this.userInput.trim() !== '') {
      // Add current Unix timestamp to the message
      const timestamp = Math.floor(Date.now() / 1000);
      const messageWithTimestamp = this.userInput + timestamp.toString();

      // Encrypt the message using AES encryption
      this.encryptedMessage = CryptoJS.AES.encrypt(messageWithTimestamp, 'you-cheeky-devil').toString();
      // Calculate half length of the encrypted message
      this.halfLength = Math.ceil(this.encryptedMessage.length / 2);
    }
  }
}