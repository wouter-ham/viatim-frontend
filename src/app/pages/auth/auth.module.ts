import { NgModule } from '@angular/core';

import { LoginComponent } from './login/login.component';
import { ActivationComponent } from './activation/activation.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AuthComponent } from './auth.component';
import { ComponentsModule } from '../../components/components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [AuthComponent, LoginComponent, RegisterComponent, ActivationComponent, ForgotPasswordComponent],
  imports: [ComponentsModule, ReactiveFormsModule, NgIf, RouterOutlet, RouterLink],
})
export class AuthModule {}
