import { Component } from '@angular/core';
import { echo } from '../../../echo-config';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, Validators, FormGroup } from '@angular/forms';
import { MessagesService } from '../../../services/messages.service';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-chat',
  imports: [CommonModule, ReactiveFormsModule, ToastModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
  providers: [MessageService]
})
export class ChatComponent {
  messages: { user: string, message: string }[] = [];

  form = new FormGroup({
    message: new FormControl('', [Validators.required, Validators.maxLength(255)])
  })

  get message() { return this.form.get('message'); }

  constructor(private messageService: MessagesService, private messagePrime: MessageService, private cdr: ChangeDetectorRef) {
    echo.channel('chat').listen('.new-message', (data: { user: string, message: string }) => {
      this.messages.push(data);
      this.cdr.detectChanges();
    })
  }

  showAlert(severity: string, summary: string, detail: string) {
    this.messagePrime.add({ severity: severity, summary: summary, detail: detail, key: 'br', life: 3000 });
  }


  sendMessage() {

    if (this.form.valid) {

      this.messageService.store(this.form.value.message).subscribe({
        next: (res) => {
          this.form.reset();
        },
        error: (err) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 0) {
              this.showAlert('error', 'Error', 'Server connection error.');
            }
          }
        }
      });

    }
  }

}
