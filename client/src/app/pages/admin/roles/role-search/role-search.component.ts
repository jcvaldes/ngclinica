import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ComboSearchComponent } from '../../../../shared/combo-search/combo-search.component';

import { UserService } from '../../users/user.service';
import { Role } from '../role.model';
import _ from 'lodash';
import { HttpService } from '../../../../services/http.service';
import { RoleService } from '../role.service';

@Component({
  selector: 'app-role-search',
  templateUrl: './role-search.component.html',
  styleUrls: ['./role-search.component.scss']
})
export class RoleSearchComponent extends ComboSearchComponent<Role> {
  selected: string;
  @Output() selectionChange = new EventEmitter();
  constructor(public _roleService: RoleService) {
    super(_roleService, false);
  }
  onSelectionChange(evt) {
    const selected = _.filter(this.payload, (el) => {
      return el.id === evt.value[0];
    });
    this.selected = selected[0].name;
    debugger
    this.selectionChange.emit(evt.value);
  }
}
