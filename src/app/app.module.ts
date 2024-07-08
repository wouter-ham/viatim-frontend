import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';

import { AppRoutingModule } from './app-routing.module';
import { AuthState } from './states/auth';
import { AuthModule, DashboardModule } from './pages';
import { AppComponent } from './app.component';
import { AuthGuard } from './guards/auth-guard';
import { ComponentsModule } from './components/components.module';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { UsersState } from './states/users';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardModule,
    AuthModule,
    ComponentsModule,
    NgxsModule.forRoot([AuthState, UsersState]),
    NgxsRouterPluginModule.forRoot(),
  ],
  bootstrap: [AppComponent],
  providers: [AuthGuard, provideHttpClient(withInterceptorsFromDi())],
})
export class AppModule {}
