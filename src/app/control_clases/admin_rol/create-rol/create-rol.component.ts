import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { rol } from 'src/app/models/rol.iterface';
import { CrudService } from 'src/app/service/crud.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-rol',
  templateUrl: './create-rol.component.html',
  styleUrls: ['./create-rol.component.css'],
})
export class CreateRolComponent implements OnInit {
  createRolForm = new FormGroup({
    rol: new FormControl('', Validators.required),
  });
  constructor(
    private activeRouter: ActivatedRoute,
    private Router: Router,
    private api: CrudService
  ) {}

  ngOnInit(): void {}
  createRol(form: rol) {
    if (this.createRolForm.controls['rol'].value == null) {
      Swal.fire('Cuidado', 'Llene todos los campos', 'warning');
    }
    try {
      this.api.post('rol', form).subscribe((data) => {
        Swal.fire('Felicidades', 'Ha creado un nuevo rol', 'success');
        this.Router.navigate(['rol/getRols'])
      });
    } catch (error) {
      Swal.fire('Error', 'Ha sucedido un error', 'error');
    }
  }
}
