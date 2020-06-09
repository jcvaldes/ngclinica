import { Component, OnInit, Input } from '@angular/core';
import { ComboSearchComponent } from '../../../../shared/combo-search/combo-search.component';

import { UserService } from '../../users/user.service';
import { Category } from '../category.model';
import _ from 'lodash';
import { HttpService } from '../../../../services/http.service';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category-search',
  templateUrl: './category-search.component.html',
  styleUrls: ['./category-search.component.scss']
})
export class CategorySearchComponent extends ComboSearchComponent<Category> {
  selected: string;
  @Input() isMultiple = true;
  constructor(public _CategoryService: CategoryService) {
    super(_CategoryService, false);
  }
  onSelectionChange(evt) {
    const selected = _.filter(this.payload, (el) => {
      return el.id === evt.value[0];
    });
    this.selected = selected[0].name;
  }
}
