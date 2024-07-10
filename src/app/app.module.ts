import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsModule } from '@ngxs/store';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ComponentsModule } from './components/components.module';
import { AuthGuard } from './guards/auth-guard';
import { AuthModule, DashboardModule } from './pages';
import { AuthState } from './states/auth';
import { UsersState } from './states/users';

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
