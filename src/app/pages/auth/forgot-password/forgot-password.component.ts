import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Navigate } from '@ngxs/router-plugin';
import { Store } from '@ngxs/store';

import { ResetPassword } from '../../../states/auth';

@Component({
  selector: 'app-users-forgot-password',
  templateUrl: './forgot-password.component.html',
})
export class ForgotPasswordComponent {
  public isBusy: boolean = false;
  public forgotPasswordForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  public constructor(private store: Store) {}

  public onSubmit(): void {
    try {
      this.isBusy = true;
      const data = this.forgotPasswordForm.value;
      console.log(data.email);
      this.store.dispatch([new ResetPassword(data.email), new Navigate(['/login'])]);
    } catch (e) {
      console.error(e);
    } finally {
      this.isBusy = false;
    }
  }
}
