import { RegisterComponent } from './register/register.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationComponent } from './authentication.component';
import { LoginComponent } from './login/login.component';
import { AuthSecureGuard } from '../services/auth.secureguard';


const routes: Routes = [{
    path: '', component: AuthenticationComponent,
    children: [
        { path: 'login', component: LoginComponent, canActivate: [AuthSecureGuard]},
        { path: 'register', component: RegisterComponent, canActivate: [AuthSecureGuard] }
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AuthenticationRoutingModule { }
