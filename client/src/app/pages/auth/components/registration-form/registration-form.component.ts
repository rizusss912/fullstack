import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../../services/auth/auth.service";
import {Router} from "@angular/router";
import {BehaviorSubject, combineLatest, Observable} from "rxjs";
import {finalize, map, startWith, tap} from "rxjs/operators";
import {UserLoginRequest} from "../../../../../../../src/routes/auth/interfaces/user-login-request";

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationFormComponent implements OnInit {
  public error$ = new BehaviorSubject<string | null>(null);
  public isLoading$ = new BehaviorSubject<boolean>(false);
  public hidePassword$ = new BehaviorSubject<boolean>(false);

  public form: FormGroup;
  public isDisabledButton$: Observable<boolean>;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {
  }

  public ngOnInit(): void {
    this.form = RegistrationFormComponent.authForm;
    this.isDisabledButton$ = this._isDisabledButton$;
  }

  public goToMain(): void {
    this.router.navigate(['']);
  }

  public changeHiddenPassword(): void {
    this.hidePassword$.next(!this.hidePassword$.getValue());
  }

  public onRegistration(): void {
    this.isLoading$.next(true);

    const req: UserLoginRequest = {
      login: this.form.value.login,
      password: this.form.value.password.first,
    };

    this.authService.registration$(req)
      .pipe(
        tap(() => this.error$.next(null)),
        finalize(() => this.isLoading$.next(false)),
      )
      .subscribe(
        () => this.router.navigate(['/lk']),
        error => this.error$.next(error?.error?.message || error?.message || 'Не удалось зарегистрироваться'),
      );
  }

  private static get authForm(): FormGroup {
    return new FormGroup({
      login: new FormControl(null, [Validators.required]),
      password: new FormGroup({
        first: new FormControl(null, [Validators.required]),
        second: new FormControl(null, [Validators.required]),
      }, [RegistrationFormComponent.getPasswordValidator]),
    });
  }

  private get _isDisabledButton$(): Observable<boolean> {
    return combineLatest([this.isLoading$, this._isValidForm$]).pipe(
      map(([isLoading, isValidForm]: [boolean, boolean]) => isLoading || !isValidForm),
    );
  }

  private get _isValidForm$(): Observable<boolean> {
    return this.form.statusChanges.pipe(
      map((status: string) => status === 'VALID'),
      startWith(false),
    );
  }

  private static getPasswordValidator(passwordForm: AbstractControl): {[key: string]: string} | null {
    const first = passwordForm.get('first').value;
    const second = passwordForm.get('second').value;

    return second && first && first !== second ? { password: 'ffff ' } : null;
  }
}
