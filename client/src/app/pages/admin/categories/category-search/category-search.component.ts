import { environment } from './../../../../../environments/environment';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ComboSearchComponent } from '../../../../shared/combo-search/combo-search.component';

import { UserService } from '../../users/user.service';
import { Category } from '../category.model';
import _ from 'lodash';
import { HttpService } from '../../../../services/http.service';

import { User } from '../../users/user.model';

@Component({
  selector: 'app-category-search',
  templateUrl: './category-search.component.html',
  styleUrls: ['./category-search.component.scss']
})
export class CategorySearchComponent extends ComboSearchComponent<Category> {
  selected: string;
  @Input() isMultiple = true;
  @Output() categoryChanged = new EventEmitter<User[]>();
  constructor(public _httpService: HttpService) {
    super(_httpService, `${environment.apiUrl}/api/category`);
  }
  onSelectionChange(evt) {
    const selected = _.filter(this.payload, (el) => {
      return el.id === evt.value;
    });
    this.categoryChanged.emit(selected[0]);
  }
}
