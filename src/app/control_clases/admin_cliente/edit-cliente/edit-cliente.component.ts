import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { cliente } from 'src/app/models/cliente.interface';
import { CrudService } from 'src/app/service/crud.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-cliente',
  templateUrl: './edit-cliente.component.html',
  styleUrls: ['./edit-cliente.component.css']
})
export class EditClienteComponent implements OnInit {
 editClienteForm= new FormGroup({
  id: new FormControl(null,Validators.required),
  name_client: new FormControl('',Validators.required)
 })
  clientes:Array<any>=[];
  datosClientes:cliente={
    id: 0,
    name_client:''
  }
  constructor(
    private activeRouter: ActivatedRoute,
    private router: Router,
    private api: CrudService
  ) { }

  ngOnInit(): void {
      let id = this.activeRouter.snapshot.paramMap.get('id');
      this.api.getById('cliente',id).subscribe((data:any)=>{
        this.datosClientes=data;
        this.editClienteForm.setValue({
          id: this.datosClientes.id,
          name_client: this.datosClientes.name_client
        })
      })
  }
  putCliente(form:cliente){
    try {
     let id=this.activeRouter.snapshot.paramMap.get('id');
    this.api.put('cliente',form,id).subscribe(data=>{
      Swal.fire('Felicidades', 'Has editado a un cliente', 'success');
    })
    } catch (error) {
      Swal.fire('Error','Lo sentimos, ha sucedido un eror', 'error');
    }
  }
}
