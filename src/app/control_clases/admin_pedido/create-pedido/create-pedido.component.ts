import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-pedido',
  templateUrl: './create-pedido.component.html',
  styleUrls: ['./create-pedido.component.css'],
})
export class CreatePedidoComponent implements OnInit {
  createPedidoForm = new FormGroup({
    cantidadProducto: new FormControl(null, Validators.required),
    referenciaProducto: new FormControl(null, Validators.required),
    id_factura: new FormControl(null, Validators.required),
  });
  constructor(
    private activeRouter: ActivatedRoute,
    private router: Router,
    private api: CrudService
  ) {}
  public clientes: Array<any> = [];
  public productos: Array<any> = [];
  public facturas: Array<any> = [];
  public pedidoxFactura: Array<any> = [];
  public productAble: Array<any> = [];
  public id: any = '';
  public indice: any = '';
  public restaStock: number = 0;
  public optionProduct= "0";
  public showOptionProduct:string="";
  ngOnInit(): void {
    this.activeRouter.params.subscribe((params: Params) => {
      this.id = params['id'];
    });
    this.getPedidoByIdFactura(this.id);
    this.LoadStock();
  }

  LoadStock() {
    try {
      this.api.get('stock').subscribe((data: any) => {
        this.productos = data;
      });
    } catch (error) {
      Swal.fire('Error', 'Ha sucedido un problema', 'error');
    }
  }

  postPedidoForm() {
    this.LoadStock();
    this.createPedidoForm.patchValue({ id_factura: this.id });
    if (
      this.createPedidoForm.controls['cantidadProducto'].value == null ||
      this.createPedidoForm.controls['referenciaProducto'].value == null
    ) {
      Swal.fire('Error', 'Llene los espacios vacios', 'warning');
    }

    for (let index = 0; index < this.productos.length; index++) {
      if (
        this.createPedidoForm.controls['referenciaProducto'].value ==
        this.productos[index].id
      ) {
        this.indice = index;
      }
    }
    this.restaStock =
      this.productos[this.indice].Cantidad_Disponible -
      this.createPedidoForm.controls['cantidadProducto'].value;

    if (this.restaStock >= 0) {
      try {
        this.api
          .post('pedido', this.createPedidoForm.value)
          .subscribe((data) => {
            Swal.fire('Felicidades', 'Pedido Realizado', 'success');
            this.getPedidoByIdFactura(this.id);
            this.api.put(
              'pedido/validationsStock',
              this.restaStock,
              this.productos[this.indice].id
            );
            this.LoadStock();
          });
      } catch (error) {
        Swal.fire('Error', 'Lo sentimos, ha sucedido un error');
      }
    } else {
      Swal.fire(
        'Cuidado',
        'La cantidad excede a la disponible, ' +
          ' hay ' +
          this.productos[this.indice].Cantidad_Disponible +
          ' unidades del producto',
        'warning'
      );
    }
  }

  /* Conseguir traer los pedidos por cada factura*/
  getPedidoByIdFactura(id: any) {
    try {
      this.api.getById('pedido/relations', id).subscribe((data: any) => {
        this.pedidoxFactura = data;
      });
    } catch (error) {}
  }

  LoadStockProduct(id: any) {
    try {
      this.api.getById('pedido/validationsStock', id).subscribe((data: any) => {
        return data;
      });
    } catch (error) {
      Swal.fire('Error', 'Ha sucedido un problema', 'error');
    }
  }

  deletePedido(id: any) {
    try {
      this.api.delete('pedido', id).subscribe((data: any) => {
        Swal.fire('Cuidado', 'Has eliminado un pedido', 'warning');
      });
    } catch (error) {
      Swal.fire('Error', 'Ha sucedido un problema', 'error');
    }
  }


}
