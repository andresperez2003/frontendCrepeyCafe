
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { product } from 'src/app/models/product.interface';
import { CrudService } from 'src/app/service/crud.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  constructor(
    private activeRouter: ActivatedRoute,
    private router: Router,
    private api: CrudService
  ) {}

  datosProduct: product = {
    producto: '',
    Cantidad_Disponible: 0,
    precioProductoCompra: 0,
    precioVentaUnidad: 0,
  };

  editForm = new FormGroup({
    producto: new FormControl('', Validators.required),
    precioProductoCompra: new FormControl(null, Validators.required),
    Cantidad_Disponible: new FormControl(null, Validators.required),
    precioVentaUnidad: new FormControl(null, Validators.required),
  });
  ngOnInit(): void {
    let id = this.activeRouter.snapshot.paramMap.get('id');
  this.setValuesOnForm(id);
  this.api.checkLocalStorage();
  }
  setValuesOnForm(id:any){
     this.api.getById('stock', id).subscribe((data: any) => {
       this.datosProduct = data;
       this.editForm.setValue({
         producto: this.datosProduct.producto,
         Cantidad_Disponible: this.datosProduct.Cantidad_Disponible,
         precioProductoCompra: this.datosProduct.precioProductoCompra,
         precioVentaUnidad: this.datosProduct.precioVentaUnidad,
       });
     });
  }
  putForm(form: product) {
    try {
      let id = this.activeRouter.snapshot.paramMap.get('id');
      this.api.put('stock',form, id).subscribe((data:any) => {
        console.log(data);
        Swal.fire('Felicidades', 'Has editado un producto', 'success');
      });
    } catch (error) {
      Swal.fire('Lo sentimos', 'Ha habido un error', 'error');
    }
  }

}





