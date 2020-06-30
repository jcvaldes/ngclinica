import { environment } from './../../../../../environments/environment';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ComboSearchComponent } from '../../../../shared/combo-search/combo-search.component';

import { UserService } from '../../users/user.service';

import _ from 'lodash';
import { HttpService } from '../../../../services/http.service';

import { User } from '../user.model';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss']
})
export class UserSearchComponent extends ComboSearchComponent<User> {
  selected: string;
  @Input() isMultiple = true;
  @Output() userChanged = new EventEmitter<User[]>();
  constructor(public _httpService: HttpService) {
    super(_httpService, `${environment.apiUrl}/api/user`);
  }
  onSelectionChange(evt) {
    const selected = _.filter(this.payload, (el) => {
      return el.id === evt.value;
    });
    this.userChanged.emit(selected[0]);
  }
}
