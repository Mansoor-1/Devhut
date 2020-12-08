import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthenticationComponent } from './authentication.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { MaterialModule } from '../material.module';
import { RegisterComponent } from './register/register.component';
import { AuthService } from '../services/auth.service';



@NgModule({
  declarations: [
    AuthenticationComponent,
    NavbarComponent,
    LoginComponent,
    LayoutComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
    AuthenticationRoutingModule,
  ],
  providers: [AuthService]
})
export class AuthenticationModule { }
