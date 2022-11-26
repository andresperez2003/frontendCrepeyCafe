import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  //Path to do query in the Api
  url = 'http://localhost:5000/';

  //Variable para refrescar los datos
  private _refresh = new Subject<void>();

  constructor(
    private http: HttpClient,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  //Get all data
  get(controller: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem('token') || [''],
    });
    let urlController = this.url + controller;
    return this.http.get(urlController, {
      headers,
    });
  }
  //Refrescar los datos

  get refresh() {
    return this._refresh;
  }

  //Get a object by an id
  getById(controller: string, id: any) {
    let urlController = this.url + controller + '/' + id;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem('token') || [''],
    });
    return this.http.get<Response>(urlController, {
      headers,
    });
  }

  //Create an object
  post(controller: string, form: any) {
    let urlController = this.url + controller;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem('token') || [''],
    });
    return this.http.post<Response>(urlController, form, {
      headers,
    });
  }

  //Edit a object by an id
  put(controller: string, form: any, id: any) {
    let urlController = this.url + controller + '/' + id;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem('token') || [''],
    });
    return this.http.put<Response>(urlController, form, {
      headers,
    });
  }

  patch(controller: string, form: any, id: any) {
    let urlController = this.url + controller + '/' + id;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem('token') || [''],
    });
    return this.http.patch<Response>(urlController, form, {
      headers,
    });
  }
  //Delete a object by an id
  delete(controller: string, id: any) {
    let urlController = this.url + controller + '/' + id;
    let Options = {
      headers: new HttpHeaders({
        'Content-type': 'aplication/json',
        'x-access-token': localStorage.getItem('token') || [''],
      }),
      body: id,
    };
    return this.http.delete<Response>(urlController, Options).pipe(
      tap(() => {
        this._refresh.next();
      })
    );
  }

  checkLocalStorage() {
    if (localStorage.getItem('token') == null) {
      this.router.navigate(['access/login']);
    }
  }
}


