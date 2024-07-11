import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Navigate } from '@ngxs/router-plugin';
import { Store } from '@ngxs/store';
import { firstValueFrom } from 'rxjs';

import { UsersService } from '../../../services';
import { AuthService } from '../../../services/auth.service';
import { LogoutUser } from '../../../states/auth';

@Component({
  selector: 'app-users-activation',
  templateUrl: './activation.component.html',
})
export class ActivationComponent implements OnInit {
  public isBusy = false;
  public error?: { title: string; message?: string };
  public activationForm: FormGroup = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(4)]),
    repeatPassword: new FormControl('', [Validators.required, Validators.minLength(4), this.passwordsMatch()]),
  });

  public constructor(
    private route: ActivatedRoute,
    private store: Store,
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  public async ngOnInit(): Promise<void> {
    try {
      const hash: string = this.route.snapshot.paramMap.get('hash');
      await firstValueFrom(this.authService.checkHash(hash));
    } catch (e) {
      this.store.dispatch(new LogoutUser());
    }
  }

  public passwordsMatch(): any {
    return (control: FormControl): { [s: string]: boolean } => {
      if (!this.activationForm) {
        return null;
      }

      const passwordValue = this.activationForm.value.password;
      const repeatPasswordValue = control.value;

      if (passwordValue !== repeatPasswordValue) {
        return { notEqual: true };
      }

      return null;
    };
  }

  public async onSubmit(): Promise<void> {
    if (!this.activationForm.valid) {
      return;
    }

    try {
      this.isBusy = true;
      const hash: string = this.route.snapshot.paramMap.get('hash');
      const password = this.activationForm.value.password;
      await firstValueFrom(this.authService.activateUser(hash, password));
      this.store.dispatch(new Navigate(['/login']));
    } catch (e) {
      this.error = { title: 'Iets ging verkeerd.', message: e.error.message };

      setTimeout((): null => (this.error = null), 5000);
    } finally {
      this.isBusy = false;
      this.error = null;
    }
  }
}
