import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { cliente } from 'src/app/models/cliente.interface';
import { CrudService } from 'src/app/service/crud.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-cliente',
  templateUrl: './create-cliente.component.html',
  styleUrls: ['./create-cliente.component.css']
})
export class CreateClienteComponent implements OnInit {

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private api: CrudService
  ) { }
 createClienteForm = new FormGroup({
  id: new FormControl(null, Validators.required),
  name_client: new FormControl('', Validators.required)
 })
  ngOnInit(): void {
  }
  createCliente(form:cliente){
    if (this.createClienteForm.controls['id'].value==null || this.createClienteForm.controls['name_client'].value==null) {
      Swal.fire('Cuidado', 'Llene los espacios vacios', 'warning');
    }
   try {
    this.api.post('cliente', form).subscribe((data) => {
      Swal.fire('Felicidades', 'Has creado un nuevo cliente', 'success');
      this.router.navigate(['cliente/getCliente'])
    });
   } catch (error) {
      Swal.fire('Error', 'Lo sentimos, ha sucedido un eror', 'error')
   }
  }
}
