import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../shared/material.module';
import { SpecialitiesRoutingModule } from './specialities-routing.module';
import { SpecialitiesComponent } from './specialities.component';
import { SpecialityDetailComponent } from './speciality-detail/speciality-detail.component';
import { SpecialityListComponent } from './speciality-list/speciality-list.component';
import { SharedModule } from '../../../shared/shared.module';
import { SpecialitySearchComponent } from './speciality-search/speciality-search.component';
import { SpecialityService } from './speciality.service';
import { SpecialityListResolverGuard } from './speciality-list/speciality-list-resolver.guard';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SpecialitiesRoutingModule,
    SharedModule,
  ],
  declarations: [
    SpecialitiesComponent,
    SpecialityDetailComponent,
    SpecialityListComponent,
    SpecialitySearchComponent
  ],
  exports: [
    SpecialitySearchComponent,
  ],
  providers: [SpecialityService, SpecialityListResolverGuard],
  entryComponents: []
})
export class SpecialitiesModule {}
