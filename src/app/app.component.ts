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
  value = false;
  constructor(
    private activeRoute: ActivatedRoute,
    private api: CrudService,
    private router: Router
  ) {}
  ngOnInit(): void {
  }
  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }
  showId():boolean{
    let token = localStorage.getItem('token') || '' ;
    const tokenInfo = this.getDecodedAccessToken(token) || ''; // decode token
   const activeValue = tokenInfo.active || false; // get token expiration dateTime
   this.value = activeValue;
   if (this.value == true) {
    return true;
   }
   return false;
  }

}



