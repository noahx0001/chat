import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.css'
})
export class AuthLayoutComponent {
  user: any
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.getUser()
  }

  getUser() {
    this.authService.user().subscribe({
      next: (user) => {
        this.user = user
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
  logout() {
    this.authService.logout().subscribe({
      next: () => {
        localStorage.removeItem('token')
        sessionStorage.removeItem('token')
        this.user = null
        this.router.navigate(['/login'])
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
}
