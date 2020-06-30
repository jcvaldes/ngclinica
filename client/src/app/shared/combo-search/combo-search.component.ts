import { Component, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { HttpService } from '../../services/http.service';

export abstract class ComboSearchComponent<T> implements OnDestroy {
  @Input() isRequired = false;
  @Input() comboCtrl: FormControl;
  /** control for the selected bank */
  // protected comboCtrl: FormControl;
  /** control for the MatSelect filter keyword */
  public comboFilterCtrl: FormControl = new FormControl();
  /** list of banks filtered by search keyword */
  public filteredData: ReplaySubject<T[]> = new ReplaySubject<T[]>(1);
  /** Subject that emits when the component has been destroyed. */
  public _onDestroy = new Subject<void>();
  public payload: any;
  constructor(
    public service: HttpService,
    public url: string
  ) {
    this.onLoad(url);
    this.onChange();
  }
  protected onLoad(url) {
    return this.service
      .get(url, null)
      .subscribe((response: any) => {
        this.payload = response;
        this.filteredData.next(response.slice());
      });
  }
  protected onChange() {
    this.comboFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterData();
      });
  }
  protected filterData() {
    if (!this.payload) {
      return;
    }
    // get the search keyword
    let search = this.comboFilterCtrl.value;
    if (!search) {
      this.filteredData.next(this.payload.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the data
    this.filteredData.next(
      this.payload.filter(
        result => result.name.toLowerCase().indexOf(search) > -1
      )
    );
  }

  // onSelectionChange(event: MatOptionSelectionChange, item: any) {
  //   if (event.isUserInput) {
  //     this.filteredShipowners;
  //   }
  // }
  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
