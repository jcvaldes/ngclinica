import { environment } from './../../../../../environments/environment';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { fromEvent, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

import Swal from 'sweetalert2';
import { UserDetailComponent } from '../user-detail/user-detail.component';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../../../services/notification.service';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { MatTableDataSource } from '@angular/material/table';
import { validRoles } from '../../../../utils/enums';
import { HttpService } from '../../../../services/http.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  dataSource: MatTableDataSource<User>;
  displayedColumns: string[] = [
    'img',
    'firstname',
    'lastname',
    'email',
    'role',
    'active',
    'actions',
  ];
  url: string;
  @ViewChild('input', { static: true }) input: ElementRef;
  filter: string;
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    public notificationService: NotificationService,
    public _httpService: HttpService,
  ) {
    this.url = `${environment.apiUrl}/api/user`;
  }

  ngOnInit() {
    this._httpService.get(this.url, [
      validRoles.Admin,
      validRoles.Professional,
      validRoles.Patient
    ]).subscribe(users => {
      this.dataSource = users;
    });
  }

  onDelete(id) {
    Swal.fire({
      title: '¿Está seguro?',
      text: 'Estás a punto de desactivar un Paciente',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, Desactivar!',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.value) {
        this._httpService.delete<User>(`${this.url}/${id}`).subscribe(
          () => {
            this.notificationService.success(
              'El usuario seleccionado ha sido Eliminado',
            );
            this.ngOnInit();
          },
          (err) => {
            console.log(err);
            Swal.fire({
              title: 'Error',
              text: err.error.message,
              icon: 'error',
              showConfirmButton: false,
              timer: 2000,
              animation: false,
            });
          },
        );
      }
    });
  }
  onSearchClear() {
    if (this.input.nativeElement.value.length > 0) {
      this.input.nativeElement.value = '';
      this.ngOnInit();
    }
  }
}
