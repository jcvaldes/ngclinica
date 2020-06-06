import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { fromEvent, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

import Swal from 'sweetalert2';
import { TurnDetailComponent } from '../turn-detail/turn-detail.component';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../../services/notification.service';
import { TurnService } from '../turn.service';
import { TableDataSource } from '../../../shared/datasource.component';
import { Turn } from '../turn.model';


@Component({
  selector: 'app-turn-list',
  templateUrl: './turn-list.component.html',
  styleUrls: ['./turn-list.component.scss']
})
export class TurnListComponent implements OnInit, AfterViewInit {
  dataSource: TableDataSource<Turn>;
  displayedColumns: string[] = [
    'active',
    'actions',
  ];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild('input', { static: true }) input: ElementRef;
  filter: string;
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    public notificationService: NotificationService,
    public _turnService: TurnService,
  ) {
    // _turnService.url = '/api/turn';
    // this.dataSource = this.route.snapshot.data['turns'];
    this.route.data.subscribe((data: {turns: TableDataSource<Turn>}) => {
      this.dataSource = data.turns;
    });
  }

  ngOnInit() {
    // this.dataSource = this.route.snapshot.data['turns'];

    this.filter = '';
    // this.paginator._intl.itemsPerPageLabel = 'Ítems por página: ';
    // this.paginator._intl.getRangeLabel = this.spanishRangeLabel;
  }
  onCreate() {
    const dialogRef = this.dialog.open(
      TurnDetailComponent,
      this.dialogConfig(),
    );
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadPage();
      }
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
      text: 'Estás a punto de desactivar un Paciente',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, Desactivar!',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.value) {
        // this._turnService.delete<Turn>(id).subscribe(
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

  ngAfterViewInit() {
    // server-side search
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadPage();
          this.filter = this.input.nativeElement.value;
        }),
      )
      .subscribe();
    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    // this.paginator.page.pipe(tap(() => {
    //   debugger
    //   this.loadPage();
    // })).subscribe();
    // on sort or paginate events, load a new page

    // merge(this.sort.sortChange, this.paginator.page)
    //   .pipe(tap(() => {
    //     this.loadPage();
    //   }))
    //   .subscribe();
  }
  loadPage() {
    this.router.navigated = false;
    // tslint:disable-next-line: max-line-length
    this.router.navigate(['/turns'],
      { queryParams:
        {
          filter: this.input.nativeElement.value,
          pageIndex: this.paginator.pageIndex,
          pageSize: this.paginator.pageSize
        }
      }).then(() => {
        // console.log(this.route.snapshot.data.turns);
      });
  }

  dialogConfig(data?) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '700px';
    dialogConfig.data = data || null;
    return dialogConfig;
  }
  spanishRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) { return `0 de ${length}`; }

    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    // If the start index exceeds the list length, do not try and fix the end index to the end.
    const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} de ${length}`;
  }
}
