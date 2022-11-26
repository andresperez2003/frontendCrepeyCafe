import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-get-rol',
  templateUrl: './get-rol.component.html',
  styleUrls: ['./get-rol.component.css'],
})
export class GetRolComponent implements OnInit {
  public rols: Array<any> = [];
  constructor(
    private activeRoute: ActivatedRoute,
    private api: CrudService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe((paramMap: any) => {
      const { params } = paramMap;
      this.cargarData();
    });
  }
  cargarData() {
    this.api.get('rol').subscribe((data: any) => {
       if (data.status == 'noActive') {
        this.router.navigate(['access/dashboard']);
        Swal.fire('Error', 'No tiene permitido el acceso', 'error');
      }else{
        this.rols=data;
      }
    });
  }
  deleteRol(id:any){
    try {
     this.api.delete('rol', id).subscribe(data=>{
      Swal.fire('Cuidado', 'Ha eliminado un rol', 'warning');
     })
    } catch (error) {
      Swal.fire('Cuidado', 'Ha sucedido un error', 'error');
    }
  }
}
