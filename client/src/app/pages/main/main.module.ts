import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainComponent} from './main.component';
import {MainRoutingModule} from "./main-routing.module";
import {RouterModule} from "@angular/router";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {NavigatorComponent} from './components/navigator/navigator.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {BrowserModule} from "@angular/platform-browser";
import {LogoComponent} from './components/logo/logo.component';
import { FooterComponent } from './components/footer/footer.component';


@NgModule({
  declarations: [MainComponent, NavigatorComponent, LogoComponent, FooterComponent],
  imports: [
    CommonModule,
    BrowserModule,
    MainRoutingModule,
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatSidenavModule,
  ]
})
export class MainModule {
}
