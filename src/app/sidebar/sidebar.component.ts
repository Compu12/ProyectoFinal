import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { AngularFireDatabase } from '@angular/fire/database';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  




  constructor(public authSvc: AuthService, public db: AngularFireDatabase) { }

  ngOnInit(): void {
   this.profile();
  

  }


  async profile() {

    this.authSvc.afAuth.onAuthStateChanged( (user) =>{

      if (user) {
     
        this.db.database.ref('/Usuarios/' + user.uid).once('value').then(function(snapshot) {
          var perfil = (snapshot.val() && snapshot.val().perfil);
           //var email = (snapshot.val() && snapshot.val().email); asi asignas a mas variables
      console.log(perfil)
          if (perfil == 1) {
          //menu administrador
          }else{
            if (perfil==2) {
              //menu de usuario 
            }else{
              //menu de repartidor
            }
          }
         
        })
    

      } else {
        // No user is signed in.
      }
    });

  }


 

}
