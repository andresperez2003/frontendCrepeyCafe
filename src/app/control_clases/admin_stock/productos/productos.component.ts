import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { ActivatedRoute, Route, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
})
export class ProductosComponent implements OnInit {
  public productos: Array<any> = [];
  constructor(
    private route: Router,
    private api: CrudService,
    private activeRoute: ActivatedRoute
  ) {
    this.cargarData();
  }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe((paramMap: any) => {
      const { params } = paramMap;
      this.cargarData();
    });
    this.api.checkLocalStorage();
  }


  cargarData() {
    this.api.get('stock').subscribe((respuesta: any) => {
      this.productos = respuesta;
    });
  }
  deleteForm(id: any) {
    try {
      this.api.delete('stock', id).subscribe((data) => {
        Swal.fire('Cuidado', 'Has eliminado un producto', 'error');
      });
    } catch (error) {
      console.log(error);
      Swal.fire('Lo sentimos', 'Ha habido un error', 'error');
    }
  }
}

