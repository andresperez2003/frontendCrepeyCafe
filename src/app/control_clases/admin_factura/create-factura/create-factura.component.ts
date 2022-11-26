import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { factura } from 'src/app/models/factura.interface';
import { CrudService } from 'src/app/service/crud.service';
import Swal from 'sweetalert2';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-create-factura',
  templateUrl: './create-factura.component.html',
  styleUrls: ['./create-factura.component.css'],
})
export class CreateFacturaComponent implements OnInit {
  facturas: Array<any> = [];
  clientes: Array<any> = [];
  id: Number = 0;

  createFacturaForm = new FormGroup({
    id_usuario: new FormControl(null, Validators.required),
    id_cliente: new FormControl(null, Validators.required),
    fechaFactura: new FormControl(new Date(), Validators.required),
  });

  constructor(
    private activeRouter: ActivatedRoute,
    private router: Router,
    private api: CrudService
  ) {}

  ngOnInit(): void {
    this.getClient();
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }
  showId() {
    let token = localStorage.getItem('token') || '';
    const tokenInfo = this.getDecodedAccessToken(token) || ''; // decode token
    const idValue = tokenInfo.id || ''; // get token expiration dateTime
    this.id = idValue;
    console.log(this.id);
  }
  getClient() {
    try {
      this.showId();
      this.api.get('cliente').subscribe((data: any) => {
        this.clientes = data;
        console.log(data);
      });
    } catch (error) {
      Swal.fire('Error', 'Ha sucedido el error: ' + error, 'error');
    }
  }
  newFactura(form: factura) {
    try {
      form.id_usuario = this.id;
      this.api.post('factura', form).subscribe((data) => {
        Swal.fire('Felicidades', 'Ha creado una nueva factura', 'success');
      });
    } catch (error) {
      Swal.fire('Error', 'Ha sucedido un error: ' + error, 'error');
    }
  }
  //Averiguar como traer los pedidos para poder crear la factura
}
