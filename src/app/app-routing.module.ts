import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth-guard';
import {
  AccountComponent,
  ActivationComponent,
  DashboardComponent,
  ForgotPasswordComponent,
  LoginComponent,
  PostOverviewComponent,
} from './pages';
import { AuthComponent } from './pages/auth/auth.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { PostDetailComponent } from './pages/dashboard/posts/detail/post-detail.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    redirectTo: '/dashboard/posts',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'posts',
        component: PostOverviewComponent,
      },
      {
        path: 'posts/:id',
        component: PostDetailComponent,
      },
      {
        path: 'account',
        component: AccountComponent,
      },
    ],
  },
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
      },
      {
        path: 'users/activation/:hash',
        component: ActivationComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
