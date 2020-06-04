import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class ModalUploadService {
  public type: string;
  public id: string;
  public hidden: string = 'hidden';
  public notify = new EventEmitter<any>();
  constructor() {
    console.log('Modal upload listo');
  }

  hiddenModal() {
    this.hidden = 'hidden';
    this.id = null;
    this.type = null;
  }
  showModal(type: string, id: string) {
    this.hidden = '';
    this.id = id;
    this.type = type;
  }
}
