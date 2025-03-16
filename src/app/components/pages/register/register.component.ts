import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Router } from '@angular/router';
export function passwordMatchValidator(): ValidatorFn {
  return (control) => {
    const password = control.get('password');
    const password_confirmation = control.get('password_confirmation');
    if (password?.value !== password_confirmation?.value) {
      return { passwordMismatch: true };
    }
    return null;
  };
}
@Component({
  selector: 'app-register',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ToastModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  providers: [MessageService]
})

export class RegisterComponent {

  fieldErrors: { [key: string]: string } = {}
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    password_confirmation: new FormControl('', [Validators.required])
  }, { validators: passwordMatchValidator() });

  get name() { return this.form.get('name'); }
  get email() { return this.form.get('email'); }
  get password() { return this.form.get('password'); }
  get password_confirmation() { return this.form.get('password_confirmation'); }

  constructor(private authService: AuthService, private messageService: MessageService, private router: Router) { }

  showAlert(severity: string, summary: string, detail: string) {
    this.messageService.add({ severity: severity, summary: summary, detail: detail, key: 'br', life: 3000 });
  }


  submit() {
    if (this.form.valid) {
      const data = this.form.value;
      this.authService.register(data).subscribe({
        next: (res) => {
          this.showAlert('success', 'Success', res.message);
          this.router.navigate(['/login']);
          this.form.reset();
        },
        error: (err) => {
          this.handleFieldErrors(err.error.errors);
          console.log('fieldErrors', this.fieldErrors);
          this.showAlert('error', 'Error', 'Check your inputs');
        }
      });
    }
  }

  handleFieldErrors(error: any) {
    this.fieldErrors = {};

    if (error) {
      console.error('Error en el registro:', error);
      for (const key in error) {
        if (error.hasOwnProperty(key)) {
          this.fieldErrors[key] = error[key];
        }
      }
    }
  }
}
