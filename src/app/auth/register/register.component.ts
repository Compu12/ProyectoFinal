import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
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
  
  registerForm: FormGroup;
  submitted = false;

  constructor(public fb: FormBuilder, private authSvc: AuthService, private router: Router, public afDB: AngularFireDatabase) {
    this.registerForm = this.fb.group({
      numeroPermiso: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{11}$/)]),
      ruc: new FormControl('', [Validators.required, Validators.maxLength(13), Validators.pattern(/\d{9}-?\d{1}[00]\d{1}[1]/)]),
      nombreComercial: new FormControl('', [Validators.required]),
      representanteLegal: new FormControl('', [Validators.required]),
      tipoEstablecimiento: new FormControl('', [Validators.required]),
      telefono: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]),
      direccion: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,12}$/)]),
    })
  }

  get f() { return this.registerForm.controls; }

  async onRegister() {
    this.submitted = true;
    if (this.registerForm.invalid){
      return;
    }
    const { numeroPermiso, ruc, nombreComercial, representanteLegal, tipoEstablecimiento, telefono, direccion, email, password } = this.registerForm.value;
      try {
        const user = await this.authSvc.register(email, password);
        if (user) {
          this.guardarDatosBD(numeroPermiso, ruc, nombreComercial, representanteLegal, tipoEstablecimiento, telefono, direccion, email, password, user.uid);
          this.checkUserIsVerified(user);
        }
      } catch (error) {
        console.log(error);
      }
  }

  private guardarDatosBD(numeroPermiso: string, ruc: string, nombreComercial: string, representanteLegal: string, tipoEstablecimiento: string, telefono: string, direccion: string, email: string, password: string, uid: string) {
    var id = uid;
    console.log(id);
    this.afDB.database.ref('Usuarios/' + id).set({
      numeroPermiso: numeroPermiso,
      ruc: ruc,
      nombreComercial: nombreComercial,
      representanteLegal: representanteLegal,
      tipoEstablecimiento: tipoEstablecimiento,
      telefono: telefono,
      direccion: direccion,
      email: email,
      password: password,
      perfil: 2
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
