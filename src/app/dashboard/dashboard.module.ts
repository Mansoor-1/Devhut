import { NavComponent } from './nav/nav.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../material.module';
import { DashboardComponent } from './dashboard.component';
import { ProjectsComponent } from './projects/projects.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { FlaggedComponent } from './flagged/flagged.component';
import { SharedComponent } from './shared/shared.component';
import { TeamsComponent } from './teams/teams.component';



@NgModule({
  declarations: [
    DashboardComponent,
    ProjectsComponent,
    NavComponent,
    FlaggedComponent,
    SharedComponent,
    TeamsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
    DashboardRoutingModule
  ],
  providers: []
})
export class DashboardModule { }
