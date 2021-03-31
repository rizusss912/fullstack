import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {UserInfoResponse} from "../../../../../../../src/routes/user/innterfaces/user-info";
import {AuthService} from "../../../../services/auth/auth.service";
import {API} from "../../../../api/api.service";

@Component({
  selector: 'app-personal-office',
  templateUrl: './personal-office.component.html',
  styleUrls: ['./personal-office.component.less']
})
export class PersonalOfficeComponent implements OnInit {
  public readonly login$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor(
    private readonly api: API,
    private readonly http: HttpClient,
    private readonly authService: AuthService,
  ) {
  }

  public ngOnInit(): void {
    this.http.get(this.api.USER.INFO).subscribe((v: UserInfoResponse) => this.login$.next(v.login));
  }

  public onExit(): void {
    this.authService.unauthorized();
  }
}
