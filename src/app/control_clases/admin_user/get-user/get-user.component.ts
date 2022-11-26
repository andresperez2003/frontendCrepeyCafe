import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { user } from 'src/app/models/user.interface';
import { CrudService } from 'src/app/service/crud.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-get-user',
  templateUrl: './get-user.component.html',
  styleUrls: ['./get-user.component.css'],
})
export class GetUserComponent implements OnInit {
  public users: Array<any> = [];
  suscription!: Subscription;
  constructor(
    private activeRoute: ActivatedRoute,
    private api: CrudService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe((paramMap: any) => {
      const { params } = paramMap;
      this.cargarData();
      this.suscription = this.api.refresh.subscribe(() => {
        this.cargarData();
      });
    });
  }
  ngOnDestroy() {
    this.suscription.unsubscribe();
  }
  cargarData() {
    this.api.get('user').subscribe((respuesta: any) => {
      if (respuesta.status == 'noActive') {
        this.router.navigate(['access/dashboard']);
        Swal.fire('Error', 'No tiene permitido el acceso', 'error');
      } else {
        this.users = respuesta;
      }
    });
  }
  deleteUserForm(id: any) {
    try {
      this.api.delete('user', id).subscribe((data) => {
        Swal.fire('Cuidado', 'Has eliminado un usuario', 'error');
      });
    } catch (error) {
      console.log(error);
      Swal.fire('Lo sentimos', 'Ha habido un error', 'error');
    }
  }
}
