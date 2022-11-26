import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { factura } from 'src/app/models/factura.interface';
import { CrudService } from 'src/app/service/crud.service';
import { PdfMakeWrapper, Table } from 'pdfmake-wrapper';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { ITable } from 'pdfmake-wrapper/lib/interfaces';
import {
  dowloadFactura,
  dowloadPedido,
} from 'src/app/models/dowloadFactura.interface';
PdfMakeWrapper.setFonts(pdfFonts);

import Swal from 'sweetalert2';
type TableRow = [string, string, string];
type TableRowPedido = [string, number, number];
@Component({
  selector: 'app-get-factura',
  templateUrl: './get-factura.component.html',
  styleUrls: ['./get-factura.component.css'],
})
export class GetFacturaComponent implements OnInit {
  createFacturaForm = new FormGroup({
    id_usuario: new FormControl(null, Validators.required),
    id_cliente: new FormControl(null, Validators.required),
    fechaFactura: new FormControl(new Date(), Validators.required),
  });
  public usuarios: Array<any> = [];
  public clientes: Array<any> = [];
  public facturas: Array<any> = [];
  public fechas: Array<string> = [];
  public pedidos: Array<any> = [];
  public sumaTotal = 0;
  suscription!: Subscription;
  constructor(
    private activeRouter: ActivatedRoute,
    private api: CrudService,
    private route: Router
  ) {}
  ngOnInit(): void {
    this.activeRouter.paramMap.subscribe((paramMap: any) => {
      const { params } = paramMap;
      this.LoadData();
      this.LoadUser(), this.getClient();
      this.suscription = this.api.refresh.subscribe(() => {
        this.LoadData();
      });
    });
  }
  ngOnDestroy() {
    this.suscription.unsubscribe();
  }
  LoadData() {
    this.api.get('factura/relations').subscribe((respuesta: any) => {
      this.facturas = respuesta;
      for (let index = 0; index < this.facturas.length; index++) {
        let text = this.facturas[index].fechaFactura.split('T00:00:00.000Z');
        this.facturas[index].fechaFactura = text[0];
      }
    });
  }
  deleteFactura(id: any) {
    try {
      this.api.delete('factura', id).subscribe((data) => {
        Swal.fire('Cuidado', 'Ha eliminado una factura', 'warning');
      });
    } catch (error) {
      Swal.fire('Error', 'Ha sucedido un error: ' + error, 'error');
    }
  }
  LoadUser() {
    try {
      this.api.get('user').subscribe((data: any) => {
        this.usuarios = data;
      });
    } catch (error) {
      Swal.fire('Error', 'Ha sucedido un eror: ' + error, 'error');
    }
  }
  getClient() {
    try {
      this.api.get('cliente').subscribe((data: any) => {
        this.clientes = data;
      });
    } catch (error) {
      Swal.fire('Error', 'Ha sucedido el error: ' + error, 'error');
    }
  }
  newFactura(form: factura) {
    try {
      this.api.post('factura', form).subscribe((data) => {
        Swal.fire('Felicidades', 'Ha creado una nueva factura', 'success');
      });
      this.LoadData();
      let length = this.facturas.length;
      let id = this.facturas[length - 1].id;
      this.route.navigate(['/pedido/createPedido', id]);
    } catch (error) {
      Swal.fire('Error', 'Ha sucedido un error: ' + error, 'error');
    }
  }

}
