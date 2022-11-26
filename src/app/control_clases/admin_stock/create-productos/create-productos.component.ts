import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import {  FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { product } from 'src/app/models/product.interface';
import { CrudService } from 'src/app/service/crud.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-create-productos',
  templateUrl: './create-productos.component.html',
  styleUrls: ['./create-productos.component.css'],
})
export class CreateProductosComponent implements OnInit {
  nuevoForm = new FormGroup({
    producto: new FormControl('', Validators.required),
     Cantidad_Disponible: new   FormControl(null, Validators.required),
    precioProductoCompra: new FormControl(null, Validators.required),
    precioVentaUnidad: new FormControl(null, Validators.required)
  });

  constructor(
    private activeRouter: ActivatedRoute,
    private router: Router,
    private api: CrudService
  ) {}

  ngOnInit(): void {
    this.api.checkLocalStorage();
  }
  postForm(form:product){
     try {
       this.api.post('stock',form).subscribe((data:any) => {
       console.log(data);
       Swal.fire('Felicidades', 'Has creado un nuevo producto', 'success');
       this.router.navigate(['stock/productos'])
       });

     } catch (error) {
       Swal.fire('Lo sentimos', 'Ha habido un error', 'error');
     }

}
}
