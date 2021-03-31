import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {AuthService} from "../../../../services/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefaultComponent {

  constructor(private readonly router: Router) {
  }

  public goToAuth(): void {
    this.router.navigate(['/auth']);
  }

  public goToRegistration(): void {
    this.router.navigate(['/auth'], {queryParams: {registrationStep: 1}});
  }
}
