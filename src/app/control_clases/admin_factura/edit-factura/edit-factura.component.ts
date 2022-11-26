import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { factura } from 'src/app/models/factura.interface';
import { CrudService } from 'src/app/service/crud.service';
import Swal from 'sweetalert2';
import jwt_decode from 'jwt-decode';
@Component({
  selector: 'app-edit-factura',
  templateUrl: './edit-factura.component.html',
  styleUrls: ['./edit-factura.component.css'],
})
export class EditFacturaComponent implements OnInit {
  editFacturaForm = new FormGroup({
    id_cliente: new FormControl(null, Validators.required),
    fechaFactura: new FormControl(null, Validators.required),
    id_usuario: new FormControl(null, Validators.required),
  });
  datosFactura: factura = {
    id_usuario: 0,
    id_cliente: 0,
    fechaFactura: '',
  };
  clientes: Array<any> = [];
  id = 0;
  constructor(
    private activeRouter: ActivatedRoute,
    private router: Router,
    private api: CrudService
  ) {}

  ngOnInit(): void {
    this.LoadClients();
    this.putDatainInputs();
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

  LoadClients() {
    try {
      this.api.get('cliente').subscribe((data: any) => {
        this.clientes = data;
      });
    } catch (error) {
      Swal.fire('Error', 'Ha sucedido un error: ' + error, 'error');
    }
  }
  putDatainInputs() {
    this.showId();
    let id = this.activeRouter.snapshot.paramMap.get('id');
    this.api.getById('factura', id).subscribe((data: any) => {
      this.datosFactura = data;
      let fecha = this.datosFactura.fechaFactura.split('T00:00:00.000Z');
      this.editFacturaForm.patchValue({
        id_cliente: this.datosFactura.id_cliente,
        fechaFactura: fecha[0],
      });
      /*  let text = this.editFacturaForm.controls['fechaFactura'].value.split('T00:00:00.000Z'); */
    });
  }
  putFactura(form: factura) {
    try {
      let id = this.activeRouter.snapshot.paramMap.get('id');
      form.id_usuario= this.id;
      this.api.put('factura', form, id).subscribe((data) => {
        Swal.fire('Felicidades', 'Ha editado una factura', 'success');
      });
    } catch (error) {
      Swal.fire('Error', 'Ha sucedido un error: ' + error, 'error');
    }
  }
}
