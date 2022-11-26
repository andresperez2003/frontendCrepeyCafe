import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-pass',
  templateUrl: './new-pass.component.html',
  styleUrls: ['./new-pass.component.css'],
})
export class NewPassComponent implements OnInit {
  constructor(
    private activeRoute: ActivatedRoute,
    private api: CrudService,
    private router: Router
  ) {}

  newPassForm = new FormGroup({
    pass: new FormControl('', Validators.required),
  });
  ngOnInit(): void {}

  newPass() {
    try {
      if (
        this.newPassForm.controls['pass'].value ==
        (<HTMLInputElement>document.getElementById('confirmPass')).value
      ) {
        let id = this.activeRoute.snapshot.paramMap.get('id');
        this.api
          .patch('newPass', this.newPassForm.value, id)
          .subscribe((data: any) => {
            Swal.fire('Actualizada', 'Contraseña Actualizada', 'success');
            this.comeBack();
          });
      }else{
        Swal.fire("Error", 'Los campos no coinciden', 'warning');
      }
    } catch (error) {
      Swal.fire('Error', 'Ha suceidido un eror', 'error');
    }
  }
  comeBack() {
    this.router.navigate(['access/dashboard']);
  }
}
