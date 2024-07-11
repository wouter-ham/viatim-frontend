import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth-guard';
import {
  AccountComponent,
  ActivationComponent,
  DashboardComponent,
  ForgotPasswordComponent,
  LoginComponent,
  PostsComponent,
} from './pages';
import { AuthComponent } from './pages/auth/auth.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { PostComponent } from './pages/dashboard/post/post.component';

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
        component: PostsComponent,
        children: [
          {
            path: ':id',
            component: PostComponent,
          },
        ],
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
