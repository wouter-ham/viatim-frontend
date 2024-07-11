import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { catchError, EMPTY, tap } from 'rxjs';

import { IUser } from '../../../interfaces/user';
import { RegisterUser } from '../../../states/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  public isBusy: boolean = false;
  public error?: { title: string; message?: string };

  public form: FormGroup = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
    firstName: new FormControl('', {
      validators: [Validators.required],
    }),
    middleName: new FormControl(''),
    lastName: new FormControl('', {
      validators: [Validators.required],
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

    try {
      this.isBusy = true;

      const user: IUser = { ...this.form.value };

      this.store
        .dispatch(new RegisterUser(user))
        .pipe(
          catchError((e) => {
            console.log(e);
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
