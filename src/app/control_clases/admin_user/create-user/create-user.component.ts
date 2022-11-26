import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { user } from 'src/app/models/user.interface';
import { CrudService } from 'src/app/service/crud.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent implements OnInit {
  createUserForm = new FormGroup({
    name: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    pass: new FormControl('', Validators.required),
    id_rol: new FormControl('', Validators.required),
    active: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required)
  });
  public listRols:Array<any>=[];
  constructor(
    private activeRouter: ActivatedRoute,
    private api: CrudService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.api.get('user').subscribe((respuesta: any) => {
      if (respuesta.status == 'noActive') {
        this.router.navigate(['access/dashboard']);
        Swal.fire('Error', 'No tiene permitido el acceso', 'error');
      }
    })
    this.getRol();
  }

  postUserForm() {
    try {
   if (this.createUserForm.controls['active'].value == true) {
     this.createUserForm.controls['active'].patchValue(1);
     console.log(this.createUserForm.controls['active'].value);
   } else {
     this.createUserForm.controls['active'].patchValue(0);
     console.log(this.createUserForm.controls['active'].value);
   }
      this.api.post('LogUp', this.createUserForm.value).subscribe((data:any) => {
        if (data.status == 'noActive') {
        this.router.navigate(['access/dashboard']);
        Swal.fire('Error', 'No tiene permitido el acceso', 'error');
      } else {
        console.log(data);
              Swal.fire(
                'Felicidades',
                'Has creado un nuevo Usuario',
                'success'
              );
    }
     });
    } catch (error) {
      Swal.fire('Lo sentimos', 'Ha habido un error', 'error');
    }
  }
  getRol() {
    this.api.get('rol').subscribe((data: any) => {
      this.listRols = data;
      console.log(this.listRols);
    });
  }
}

