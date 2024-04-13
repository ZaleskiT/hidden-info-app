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
  toastMessage: string = '';
  showToast: boolean = false;

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

  copyFirstHalfToClipboard(text: string): void {
    const textArea = document.createElement('textarea');
    textArea.value = text.substring(0, this.halfLength);

    // Append the textarea to the document
    document.body.appendChild(textArea);

    // Select the text in the textarea
    textArea.select();

    // Copy the text to the clipboard
    document.execCommand('copy');

    // Remove the textarea from the document
    document.body.removeChild(textArea);

    // Show toast notification
    this.toastMessage = 'First half copied to clipboard!';
    this.showToast = true;

     // Hide toast after a short delay
     setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }

  copySecondHalfToClipboard(text: string): void {
    const textArea = document.createElement('textarea');
    textArea.value = text.substring(this.halfLength, this.encryptedMessage.length);

    // Append the textarea to the document
    document.body.appendChild(textArea);

    // Select the text in the textarea
    textArea.select();

    // Copy the text to the clipboard
    document.execCommand('copy');

    // Remove the textarea from the document
    document.body.removeChild(textArea);

    // Show toast notification
    this.toastMessage = 'Second half copied to clipboard!';
    this.showToast = true;

     // Hide toast after a short delay
     setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }
}