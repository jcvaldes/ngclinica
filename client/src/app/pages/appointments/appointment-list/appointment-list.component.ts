import { environment } from './../../../../environments/environment';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { fromEvent, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

import Swal from 'sweetalert2';
import { AppointmentDetailComponent } from '../appointment-detail/appointment-detail.component';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../../services/notification.service';
import { Appointment } from '../appointment.model';
import { MatTableDataSource } from '@angular/material/table';
import { HttpService } from '../../../services/http.service';


@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.scss']
})
export class AppointmentListComponent implements OnInit {
  dataSource: MatTableDataSource<Appointment>;
  displayedColumns: string[] = [
    'Category',
    'professional',
    'appointmentDate',
    'timeDate',
    'status',
    'actions',
  ];

  @ViewChild('input', { static: true }) input: ElementRef;
  filter: string;
  url: string;
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    public notificationService: NotificationService,
    public _httpService: HttpService,
  ) {
    this.url = `${environment.apiUrl}/api/appointment`;
  }

  ngOnInit() {
    this._httpService.get(this.url).subscribe(appointments => {
      this.dataSource = appointments;
    });
  }

  onEdit(row) {
    // const dialogRef = this.dialog.open(
    //   TurnDetailComponent,
    //   this.dialogConfig(row),
    // );
    // dialogRef.afterClosed().subscribe(() => {
    //   this.loadPage();
    // });
  }
  onDelete(id) {
    Swal.fire({
      title: '¿Está seguro?',
      text: 'Estás a punto de cancelar un turno',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, Cancelar!',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.value) {
        this._httpService.delete<Appointment>(`${this.url}/${id}`).subscribe(
          () => {
            Swal.fire(
              'Atención',
              'El turno ha sido cancelado',
              'success'
            );
            this.ngOnInit();
          },
          (err) => {
            console.log(err);
            Swal.fire({
              title: 'Error',
              text: err,
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
      this.loadPage();
    }
  }


  loadPage() {

  }

  dialogConfig(data?) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '700px';
    dialogConfig.data = data || null;
    return dialogConfig;
  }

}
