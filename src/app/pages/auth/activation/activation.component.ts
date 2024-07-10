import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Store } from '@ngxs/store';
import { firstValueFrom } from 'rxjs';
import { UsersService } from '../../../services';
import { LogoutUser } from '../../../states/auth';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'tna-users-activation',
  templateUrl: './activation.component.html',
})
export class ActivationComponent implements OnInit {
  @Output()
  public activate = new EventEmitter();

  @Output()
  public activationError = new EventEmitter();

  public isBusy = false;
  public activationForm: FormGroup = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    repeatPassword: new FormControl('', [Validators.required, Validators.minLength(6), this.passwordsMatch()]),
  });

  public constructor(
    private route: ActivatedRoute,
    private router: Router,
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
    try {
      this.isBusy = true;
      const hash = this.route.snapshot.paramMap.get('hash');
      const password = this.activationForm.value.password;
      const result = await firstValueFrom(this.authService.activateUser(hash, password));
      this.activate.emit(result);
      await this.router.navigate(['/login']);
    } catch (e) {
      this.activationError.emit(e);
    } finally {
      this.isBusy = false;
    }
  }
}
