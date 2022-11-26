import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-get-pedido',
  templateUrl: './get-pedido.component.html',
  styleUrls: ['./get-pedido.component.css'],
})
export class GetPedidoComponent implements OnInit {
  public pedidos: Array<any> = [];
  public clientes:Array<any>=[];
/*   public pedidoxClient:Array<any>=[]; */
  constructor(
    private activeRoute: ActivatedRoute,
   private router: Router,
    private api: CrudService
  ) {}
  ngOnInit(): void {
   /*    this.cargarData(); */
      /* this.showPedido(); */
      }
 /*  cargarData() {
    this.api.get('pedido/relations').subscribe((respuesta: any) => {
      this.pedidos = respuesta;
      console.log(this.pedidos);
    });
  } */
  deletePedido(id:any){
    try {
    this.api.delete('pedido',id).subscribe(data=>{
      Swal.fire('Cuidado', 'Ha eliminado un pedido','warning');
    })
    } catch (error) {
      Swal.fire('Error','Ha sucedido el error: '+error, 'error');
    }
  }

/* showPedido(){
    try {
      this.api.get('pedido/relations').subscribe((data:any)=>{
      this.pedidos=data;
      console.log(this.pedidos);
      })
    } catch (error) {
      Swal.fire('Error', 'Ha sucedido el error: ' + error, 'error');
    }
  } */
}
