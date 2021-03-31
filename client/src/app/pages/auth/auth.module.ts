import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { AuthFormComponent } from './components/auth-form/auth-form.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {ReactiveFormsModule} from "@angular/forms";
import {RegistrationFormComponent} from "./components/registration-form/registration-form.component";
import {RouterModule} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [
    AuthComponent,
    AuthFormComponent,
    RegistrationFormComponent,
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterModule,
    MatIconModule,
  ],
})
export class AuthModule { }
