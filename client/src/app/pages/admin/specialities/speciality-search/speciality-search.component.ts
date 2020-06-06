import { Component, OnInit } from '@angular/core';
import { ComboSearchComponent } from '../../../../shared/combo-search/combo-search.component';

import { UserService } from '../../users/user.service';
import { Speciality } from '../speciality.model';
import _ from 'lodash';
import { HttpService } from '../../../../services/http.service';
import { SpecialityService } from '../speciality.service';

@Component({
  selector: 'app-speciality-search',
  templateUrl: './speciality-search.component.html',
  styleUrls: ['./speciality-search.component.scss']
})
export class SpecialitySearchComponent extends ComboSearchComponent<Speciality> {
  selected: string;
  constructor(public _specialityService: SpecialityService) {
    super(_specialityService, false);
  }
  onSelectionChange(evt) {
    debugger
    const selected = _.filter(this.payload, (el) => {
      return el.id === evt.value[0];
    });
    this.selected = selected[0].name;
  }
}
