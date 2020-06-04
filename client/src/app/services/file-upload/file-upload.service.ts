import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import urljoin from 'url-join';

@Injectable()
export class FileUploadService {
  uploadUrl: string;
  constructor() {
    this.uploadUrl = urljoin(environment.apiUrl, '/upload');
  }

  fileUpload(file: File, type: string, id: string) {
    return new Promise((resolve, reject) => {
      let formData = new FormData();
      let xhr = new XMLHttpRequest();
      formData.append('image', file, file.name);
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log('Imagen subida');
            resolve(JSON.parse(xhr.response));
          } else {
            console.log('Falló la subida');
            reject(xhr.response);
          }
        }
      };
      let url = `${this.uploadUrl}/${type}/${id}`;
      xhr.open('PUT', url, true);
      xhr.send(formData);
    });
  }
}
