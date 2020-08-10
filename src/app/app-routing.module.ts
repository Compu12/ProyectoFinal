import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SendEmailComponent } from './auth/send-email/send-email.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

import { MainComponent } from './main/main.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  { path: 'home',component: HomeComponent }, 
  { path: 'login',component: LoginComponent  }, 
  { path: 'register',component: RegisterComponent },
  { path: 'verification-email',component: SendEmailComponent,},
  { path: 'main',component: MainComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
