import { NgIf } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';

import { ComponentsModule } from '../../components/components.module';
import { ActivationComponent } from './activation/activation.component';
import { AuthComponent } from './auth.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [AuthComponent, LoginComponent, RegisterComponent, ActivationComponent, ForgotPasswordComponent],
  imports: [ComponentsModule, ReactiveFormsModule, NgIf, RouterOutlet, RouterLink],
})
export class AuthModule {}
