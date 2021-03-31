import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent implements OnInit {
  public registrationStep$: Observable<number | null>;

  constructor(
    private readonly authService: AuthService,
    private readonly activatedRoute: ActivatedRoute,
  ) {
  }

  public ngOnInit(): void {
    this.registrationStep$ = this._registrationStep$;
  }

  private get _registrationStep$(): Observable<number | null> {
    return this.activatedRoute.queryParams.pipe(
      map(params => params.registrationStep || null),
    );
  }
}

