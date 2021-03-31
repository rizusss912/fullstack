import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../../services/auth/auth.service";
import {MatDrawer, MatDrawerContainer, MatSidenavContainer} from "@angular/material/sidenav";

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.less']
})
export class NavigatorComponent  {
  public readonly isAdmin: boolean;

  constructor(
    private readonly authService: AuthService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
  ) {
    this.isAdmin = this.authService.isAdmin;
  }

  public isActive(route: string): boolean {
    return this.router.isActive(route, true);
  }
}
