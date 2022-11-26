import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from '../service/crud.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(
    private route: Router,
    private activeRoute: ActivatedRoute,
    private api: CrudService
  ) {}
 name:string='';
  ngOnInit(): void {
    this.showName();
  }
  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }
  showName() {
    let token = localStorage.getItem('token') || '';
    const tokenInfo = this.getDecodedAccessToken(token) || ''; // decode token
    const nameValue = tokenInfo.name || ''; // get token expiration dateTime
    this.name = nameValue;
  }
  LogOut() {
    localStorage.clear();
    return this.route.navigate(['access/login']);
  }
}
