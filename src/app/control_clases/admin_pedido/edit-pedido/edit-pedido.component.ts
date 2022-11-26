import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ChildActivationStart, Router } from '@angular/router';
import { editPedido } from 'src/app/models/editPedido.interface';
import { pedido } from 'src/app/models/pedido.interface';
import { CrudService } from 'src/app/service/crud.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-pedido',
  templateUrl: './edit-pedido.component.html',
  styleUrls: ['./edit-pedido.component.css'],
})
export class EditPedidoComponent implements OnInit {
  editPedidoForm = new FormGroup({
    cantidadProducto: new FormControl(null, Validators.required),
    referenciaProducto: new FormControl(null, Validators.required)
  });
  productos: Array<any> = [];

  datosPedido: pedido ={
    id_factura:0,
    CantidadProducto:0,
    ReferenciaProducto:0
  }

  constructor(
    private activeRouter: ActivatedRoute,
    private router: Router,
    private api: CrudService
  ) {}

  ngOnInit(): void {
    this.LoadStock();
    this.putDataonInput();
  }

  LoadStock() {
    try {
      this.api.get('stock').subscribe((data: any) => {
        this.productos= data;
      });
    } catch (error) {
      Swal.fire('Error', 'Ha sucedido el error:' + error, 'error');
    }
  }
  putDataonInput() {
    let id = this.activeRouter.snapshot.paramMap.get('id');
    this.api.getById('pedido',id).subscribe((data:any)=>{
      this.datosPedido = data;
      console.log(this.datosPedido)
        this.editPedidoForm.patchValue({
        cantidadProducto: this.datosPedido.CantidadProducto,
        referenciaProducto: this.datosPedido.ReferenciaProducto
       })
    })


  }
  updateData(form:pedido){
    if (this.editPedidoForm.controls['cantidadProducto'].value==null || this.editPedidoForm.controls['referenciaProducto'].value==null) {
   Swal.fire('Error', 'Llene todos los espacios vacios', 'warning');
    }
 try {
  let id = this.activeRouter.snapshot.paramMap.get('id');
    this.api.put('pedido', form, id).subscribe(data=>{
      Swal.fire('Felicidades','Ha editado un pedido', 'success');
    })
 } catch (error) {
  Swal.fire('Error', 'Ha sucedido el error: '+error, 'error');
 }
  }
}
