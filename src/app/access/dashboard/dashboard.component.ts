import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private activeRoute:ActivatedRoute, private api: CrudService, private router:Router) { }

  ngOnInit(): void {
  this.api.get('user').subscribe((respuesta: any) => {
    if (localStorage.getItem('token')) {
      if (respuesta.status == 'noActive') {
        this.router.navigate(['access/login']);
        Swal.fire('Error', 'No tiene permitido el acceso', 'error');
      }
    }
  });
  }
}
