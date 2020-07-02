import { environment } from './../../../../../environments/environment';
import { HttpService } from './../../../../services/http.service';


import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { fromEvent, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

import Swal from 'sweetalert2';;
import { ActivatedRoute, Router } from '@angular/router';


import { MatTableDataSource } from '@angular/material/table';

import { NotificationService } from '../../../../services/notification.service';
import { Schedule } from '../schedule.model';


@Component({
  selector: 'app-schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.scss']
})
export class ScheduleListComponent implements OnInit {
  dataSource: MatTableDataSource<Schedule>;
  displayedColumns: string[] = [
    'Patient',
    'Category',
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
    this.url = `${environment.apiUrl}/api/schedule`;
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
      text: 'Estás a punto de cancelar el turno',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, Cancelar!',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.value) {
        // this._scheduleService.delete<Appointment>(id).subscribe(
        //   () => {
        //     this.notificationService.success(
        //       'El paciente seleccionado ha sido Eliminado',
        //     );
        //     this.loadPage();
        //   },
        //   (err) => {
        //     console.log(err);
        //     Swal.fire({
        //       title: 'Reglas de Validación',
        //       text: err,
        //       icon: 'error',
        //       showConfirmButton: false,
        //       timer: 2000,
        //       animation: false,
        //     });
        //   },
        // );
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
