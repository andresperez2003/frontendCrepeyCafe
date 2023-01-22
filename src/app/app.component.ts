import { Component, OnInit,  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from './service/crud.service';
import jwt_decode from 'jwt-decode';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  tittle = 'crepe-y-cafe';
  value:boolean = false;
  activeNavBar:boolean = false;
  constructor(
    private activeRoute: ActivatedRoute,
    private api: CrudService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.checkUser();

  }
  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }

  // Funcion que captura el tiempo de validacion de un token y depende de eso devuelve un dato booleano

/*   showId(): boolean {
    let token = localStorage.getItem('token') || '';
    const tokenInfo = this.getDecodedAccessToken(token) || ''; // decode token
    const activeValue = tokenInfo.active || false; // get token expiration dateTime
    this.value = activeValue;
    console.log (this.value);
    if (this.value) {
      return true;
    }
    return false;
  } */
  checkUser() {
    let navBar = localStorage.getItem('token') || null;
    if (navBar != null) {
            this.activeNavBar = true;
            this.router.navigate(['access/dashboard']);

    } else {
      this.activeNavBar = false;
    }
  }
}



