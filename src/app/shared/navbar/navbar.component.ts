
import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'firebase';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  public user$: Observable<User> = this.authSvc.afAuth.user;

  constructor(public authSvc: AuthService, private router: Router) {}

  async onLogout() {
    try {
      await this.authSvc.logout();
      this.router.navigate(['/login']);
    } catch (error) {
      console.log(error);
    }
  }
}
