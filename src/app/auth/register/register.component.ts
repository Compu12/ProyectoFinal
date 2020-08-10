import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from 'firebase';

import { AngularFireDatabase } from '@angular/fire/database';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm = new FormGroup({
    nombreT: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private authSvc: AuthService, private router: Router, public afDB: AngularFireDatabase) { }

  async onRegister() {
    const {  nombreT,email, password } = this.registerForm.value;
    try {
      const user = await this.authSvc.register(email, password);
      if (user) {
        this.guardarDatosBD(nombreT,email, password,user.uid);
        this.checkUserIsVerified(user);
      }
    } catch (error) {
      console.log(error);
    }
  }

  private guardarDatosBD(nombreT: string, email:string, password: string,uid: string) {
   // const { nombreT, email, password } = this.registerForm.value;
    var id = uid;
    console.log(id);
    this.afDB.database.ref('Usuarios/' + id).set({
      nombreT: nombreT,
      email: email,
      password: password,
      perfil:2
    });
    

  }
  private checkUserIsVerified(user: User) {
    if (user && user.emailVerified) {

    
      this.router.navigate(['/home']);

    } else if (user) {
      this.router.navigate(['/verification-email']);
    } else {
      this.router.navigate(['/register']);
    }
  }

}
