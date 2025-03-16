import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './components/layout/auth-layout/auth-layout.component';
import { GuestLayoutComponent } from './components/layout/guest-layout/guest-layout.component';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { HomeComponent } from './components/pages/home/home.component';
import { guestGuard } from './guards/guest.guard';
import { authGuard } from './guards/auth.guard';
import { ChatComponent } from './components/pages/chat/chat.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: '',
        component: GuestLayoutComponent,
        canActivate: [guestGuard],
        children: [
            { path: 'home', component: HomeComponent },
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent }
        ]
    },
    {
        path: 'app',
        component: AuthLayoutComponent,
        canActivate: [authGuard],
        children: [
            { path: 'chat', component: ChatComponent }
        ]
    },
    { path: '**', redirectTo: '' }
];
