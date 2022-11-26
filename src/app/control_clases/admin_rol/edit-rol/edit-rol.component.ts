import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { rol } from 'src/app/models/rol.iterface';
import { CrudService } from 'src/app/service/crud.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-rol',
  templateUrl: './edit-rol.component.html',
  styleUrls: ['./edit-rol.component.css']
})
export class EditRolComponent implements OnInit {
 editRolForm = new FormGroup({
  rol: new FormControl('', Validators.required)
 })
 datosRol:rol = {
   rol:''
 }
  constructor(
    private activeRouter: ActivatedRoute,
    private Router: Router,
    private api: CrudService
  ) {

  }

  ngOnInit(): void {
    let id = this.activeRouter.snapshot.paramMap.get('id');
    this.api.getById('rol', id).subscribe((data: any) => {
      this.datosRol = data;
      this.editRolForm.setValue({
        rol: this.datosRol.rol,
      });
    });
  }
 editRol(form:rol){
  try {
    if (this.editRolForm.controls['rol'].value==null) {
    Swal.fire('Error', 'Llene los campos vacios', 'error');
    }
 let id = this.activeRouter.snapshot.paramMap.get('id');
 this.api.put('rol', form, id).subscribe((data) => {
   Swal.fire('Cuidado', 'Has edita un rol', 'success');
 });
  } catch (error) {
  Swal.fire('Error', 'Ha sucedido un error', 'error');
  }

 }
}
