import { DashboardComponent } from './dashboard.component';
import { ProjectsComponent } from './projects/projects.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../services/auth.guard';
import { FlaggedComponent } from './flagged/flagged.component';
import { SharedComponent} from './shared/shared.component';
import { TeamsComponent } from './teams/teams.component';

const routes: Routes = [{
    path: '', component: DashboardComponent, canActivate: [AuthGuard],
    children: [
        { path: 'projects', component: ProjectsComponent, canActivate: [AuthGuard] },
        { path: 'flagged', component: FlaggedComponent, canActivate: [AuthGuard] },
        { path: 'shared', component: SharedComponent, canActivate: [AuthGuard] },
        { path: 'teams', component: TeamsComponent, canActivate: [AuthGuard] },
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DashboardRoutingModule { }
