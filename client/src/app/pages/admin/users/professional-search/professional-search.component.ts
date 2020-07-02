import { environment } from './../../../../../environments/environment';
import { validRoles } from './../../../../utils/enums';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash'
import { User } from '../../../admin/users/user.model';
import { HttpService } from '../../../../services/http.service';
import { ComboSearchComponent } from '../../../../shared/combo-search/combo-search.component';

@Component({
  selector: 'app-professional-search',
  templateUrl: './professional-search.component.html',
  styleUrls: ['./professional-search.component.scss']
})
export class ProfessionalSearchComponent extends ComboSearchComponent<User> {
  selected: string;
  @Input() isMultiple = true;
  @Output() professionalChanged = new EventEmitter<User[]>();
  constructor(public _httpService: HttpService) {
    super(_httpService, `${environment.apiUrl}/api/user?role=${validRoles.Professional}`);
  }
  onSelectionChange(evt) {
    const selected = _.filter(this.payload, (el) => {
      return el.id === evt.value;
    });
    this.professionalChanged.emit(selected[0]);
  }
}
