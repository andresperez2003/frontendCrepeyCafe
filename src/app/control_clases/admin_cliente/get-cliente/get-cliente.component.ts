import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { response } from 'src/app/models/response.interface';
import { CrudService } from 'src/app/service/crud.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-get-cliente',
  templateUrl: './get-cliente.component.html',
  styleUrls: ['./get-cliente.component.css']
})
export class GetClienteComponent implements OnInit {

  constructor(
    private activeRouter:ActivatedRoute,
    private router: Router,
    private api: CrudService
  ) { }
  public clientes: Array<any>=[];
  ngOnInit(): void {
    this.getClientes();
  }
 getClientes(){
    this.api.get('cliente').subscribe((data: any) => {
        this.clientes = data;

    });
 }
 deleteCliente(id:any){
  try {
    this.api.delete('cliente',id).subscribe(data=>{
      Swal.fire('Cuidado', 'Ha eliminado un Cliente', 'warning');
    })
  } catch (error) {
    Swal.fire('Error', 'Ha sucedido un error', 'error');
  }
 }

}
