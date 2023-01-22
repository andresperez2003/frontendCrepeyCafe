import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { response } from 'src/app/models/response.interface';
import { CrudService } from 'src/app/service/crud.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private api: CrudService,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private appComponent: AppComponent
  ) {}
  LoginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    pass: new FormControl('', Validators.required),
  });
  ngOnInit(): void {
    this.api.checkLocalStorage();
  }

  Login(form: any) {
    try {
      this.api.post('Login', form).subscribe((data: any) => {
        let dataResponse: response = data;
        if (dataResponse.status == 'ok') {
          localStorage.setItem('token', dataResponse.result);
          Swal.fire('Bienvenido', 'Ha entado con exito', 'success');
          this.appComponent.checkUser();
          this.router.navigate(['access/dashboard']);
        } else {
          if (dataResponse.status == 'incorrect') {
            Swal.fire(
              'Campos Incorrectos',
              'Los campos no coinciden',
              'warning'
            );
          } else {
            if (dataResponse.status == 'nothing') {
              Swal.fire('Error', 'Llene todos los campos', 'error');
            } else {
              Swal.fire('Error', 'El usuario no existe', 'error');
            }
          }
        }
      });
    } catch (error) {
      Swal.fire('Error', 'Ha sucedido el error: ' + error, 'error');
    }
  }
}
