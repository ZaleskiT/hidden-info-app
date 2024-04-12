import { Component } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent {
  combinedEncryptedString: string = '';
  decryptedMessage: string = '';
  timestamp: number | null = null;
  gmtTime: string = '';
  timeDifference: string = '';
  
  constructor() {
  }

  decryptMessage(): void {
    if (this.combinedEncryptedString.trim() !== '') {
      // Decrypt the combined encrypted string
      const decryptedBytes = CryptoJS.AES.decrypt(this.combinedEncryptedString, 'you-cheeky-devil');
      const decryptedString = decryptedBytes.toString(CryptoJS.enc.Utf8);

      // Extract original message and timestamp
      if (decryptedString.length >= 10) {
        const timestampString = decryptedString.substring(decryptedString.length - 10);
        const message = decryptedString.substring(0, decryptedString.length - 10);
        this.decryptedMessage = message;
        this.timestamp = parseInt(timestampString);

        // Convert timestamp to GMT+0 time
        const date = new Date(this.timestamp * 1000); // Convert milliseconds to seconds
        this.gmtTime = date.toUTCString();

         // Calculate time difference
         const currentTime = new Date().getTime() / 1000; // Convert milliseconds to seconds
         const difference = currentTime - this.timestamp;
         const days = Math.floor(difference / (60 * 60 * 24));
         const hours = Math.floor((difference % (60 * 60 * 24)) / (60 * 60));
         const minutes = Math.floor((difference % (60 * 60)) / 60);
         this.timeDifference = `${days} days, ${hours} hours, ${minutes} minutes ago`;
      }
    }
  }
}