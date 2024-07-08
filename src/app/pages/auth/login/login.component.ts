import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { catchError, EMPTY, tap } from 'rxjs';
import { LoginUser } from '../../../states/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public isBusy: boolean = false;
  public error?: { title: string; message?: string };

  public form: FormGroup = new FormGroup({
    username: new FormControl('', {
      validators: [Validators.required],
    }),
    password: new FormControl('', {
      validators: Validators.required,
    }),
  });

  constructor(private store: Store) {}

  public async onSubmit(): Promise<void> {
    if (this.form.valid) {
      const { username, password } = this.form.value;
      try {
        this.isBusy = true;

        this.store
          .dispatch(new LoginUser(username, password))
          .pipe(
            catchError((e) => {
              this.error = {
                title: 'Something went wrong while authenticating, please reload the page',
                message: `${e}`,
              };
              this.isBusy = false;
              return EMPTY;
            }),
            tap(() => (this.isBusy = false)),
          )
          .subscribe();
      } catch (e) {
        this.error = {
          title: 'Something went wrong while authenticating, please reload the page',
          message: `${e}`,
        };
      }
    }
  }
}
