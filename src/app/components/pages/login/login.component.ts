import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, ToastModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [MessageService]
})
export class LoginComponent {

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  get email() { return this.form.get('email'); }
  get password() { return this.form.get('password'); }

  constructor(private authService: AuthService, private messageService: MessageService, private router: Router) { }

  showAlert(severity: string, summary: string, detail: string) {
    this.messageService.add({ severity: severity, summary: summary, detail: detail, key: 'br', life: 3000 });
  }


  submit() {
    if (this.form.valid) {
      const data = this.form.value;
      this.authService.login(data).subscribe({
        next: (res) => {
          localStorage.setItem('token', res.token);
          sessionStorage.setItem('token', res.token);
          this.router.navigate(['/app/chat']);
          this.form.reset();
        },
        error: (err) => {
          this.showAlert('error', 'Error', err.error.message);
        }
      });
    }

  }
}
