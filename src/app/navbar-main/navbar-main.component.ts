import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'firebase';
@Component({
  selector: 'app-navbar-main',
  templateUrl: './navbar-main.component.html',
  styleUrls: ['./navbar-main.component.css']
})
export class NavbarMainComponent implements OnInit {
  public user$: Observable<User> = this.authSvc.afAuth.user;
  formulario = new FormGroup({
    buscar: new FormControl(''),
   
  });
  constructor(public authSvc: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  async onLogout() {
    try {
      await this.authSvc.logout();
      this.router.navigate(['/login']);
    } catch (error) {
      console.log(error);
    }
  }
}
