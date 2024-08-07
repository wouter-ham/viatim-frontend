import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { catchError, EMPTY, tap } from 'rxjs';

import { LoginUser } from '../../../states/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  public isBusy: boolean = false;
  public error?: { title: string; message?: string };

  public form: FormGroup = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      validators: Validators.required,
    }),
  });

  constructor(private store: Store) {}

  public async onSubmit(): Promise<void> {
    if (!this.form.valid) {
      return;
    }

    const { email, password } = this.form.value;
    try {
      this.isBusy = true;

      this.store
        .dispatch(new LoginUser(email, password))
        .pipe(
          catchError((e) => {
            this.error = {
              title: 'Iets ging verkeerd.',
              message: e.error.message,
            };
            this.isBusy = false;
            return EMPTY;
          }),
          tap((): boolean => (this.isBusy = false)),
        )
        .subscribe();
    } catch (e) {
      this.error = {
        title: 'Iets ging verkeerd.',
        message: e.error.message,
      };
    }
  }
}
