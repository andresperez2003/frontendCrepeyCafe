import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { user } from 'src/app/models/user.interface';
import { CrudService } from 'src/app/service/crud.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit {
  constructor(
    private activeRouter: ActivatedRoute,
    private router: Router,
    private api: CrudService
  ) {}
  public listRols: Array<any> = [];
  datosUser: user = {
    name: '',
    username: '',
    id_rol: 0,
    active: false,
    email: '',
  };
  editUserForm = new FormGroup({
    name: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    id_rol: new FormControl('', Validators.required),
    active: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
  });
  ngOnInit(): void {
    let id = this.activeRouter.snapshot.paramMap.get('id');
    this.api.getById('user', id).subscribe((data: any) => {
      this.datosUser = data;
      this.editUserForm.patchValue({
        name: this.datosUser.name,
        username: this.datosUser.username,
        id_rol:this.datosUser.id_rol,
        email: this.datosUser.email,
       active: this.datosUser.active
      });
    });
    this.getRol();
  }
  putUserForm() {
    try {
      let id = this.activeRouter.snapshot.paramMap.get('id');
      this.api.put('user', this.editUserForm.value, id).subscribe((data: any) => {
        console.log(data);
        Swal.fire('Felicidades', 'Has editado un producto', 'success');
      });
    } catch (error) {
      Swal.fire('Lo sentimos', 'Ha habido un error', 'error');
    }
  }
  getRol() {
    this.api.get('rol').subscribe((data: any) => {
      this.listRols = data;
    });
  }
  newPass(){
     let id = this.activeRouter.snapshot.paramMap.get('id');
    this.router.navigate(['access/newPass/'+id])
  }
}
