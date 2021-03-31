import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../../services/auth/auth.service";
import {Router} from "@angular/router";
import {BehaviorSubject, combineLatest, Observable} from "rxjs";
import {finalize, map, startWith, tap} from "rxjs/operators";
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from "@angular/material/form-field";

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.less'],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {required: 'always'}}
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthFormComponent implements OnInit {
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
    this.form = AuthFormComponent.authForm;
    this.isDisabledButton$ = this._isDisabledButton$;
  }

  public goToMain(): void {
    this.router.navigate(['']);
  }

  public changeHiddenPassword(): void {
    this.hidePassword$.next(!this.hidePassword$.getValue());
  }

  public onAuthorization(): void {
    this.isLoading$.next(true);

    this.authService.authorization$(this.form.value)
      .pipe(
        tap(() => this.error$.next(null)),
        finalize(() => this.isLoading$.next(false)),
      )
      .subscribe(
        () => this.router.navigate(['/lk']),
        error => this.error$.next(error?.error?.message || error?.message || 'Не удалось войти'),
      );
  }

  private static get authForm(): FormGroup {
    return new FormGroup({
      login: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
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
}
