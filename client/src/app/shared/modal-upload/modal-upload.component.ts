import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { FileUploadService } from '../../services/file-upload/file-upload.service';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {
  @ViewChild('imageFile', { static: true }) imageFile: any;
  imageUpload: File;
  imageTemp: string | ArrayBuffer;

  constructor(
    public _fileUploadService: FileUploadService,
    public _modalUploadService: ModalUploadService
  ) {}

  ngOnInit() {}
  fileUpload() {
    this._fileUploadService
      .fileUpload(
        this.imageUpload,
        this._modalUploadService.type,
        this._modalUploadService.id
      )
      .then(resp => {
        this._modalUploadService.notify.emit(resp);
        this.closeModal();
      })
      .catch(err => {
        console.error('Error en la carga...');
      });
  }
  closeModal() {
    this.imageTemp = null;
    this.imageUpload = null;
    this.imageFile.nativeElement.value = '';
    this._modalUploadService.hiddenModal();
  }
  selectImage(file: File) {
    if (!file) {
      this.imageUpload = null;
      return;
    }
    if (file.type.indexOf('image') < 0) {
      Swal.fire(
        'Sólo imágenes',
        'El archivo seleccionado no es una imagen',
        'error'
      );
      this.imageUpload = null;
      return;
    }
    this.imageUpload = file;

    // hace preview de la imagen
    let reader = new FileReader();
    let urlImageTmp = reader.readAsDataURL(file);
    reader.onloadend = () => (this.imageTemp = reader.result);
  }
}
