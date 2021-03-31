import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {DefaultComponent} from "./pages/main/pages/default/default.component";
import {AuthComponent} from "./pages/auth/auth.component";
import {AuthModule} from "./pages/auth/auth.module";
import {DefaultModule} from "./pages/main/pages/default/default.module";

const root: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
  },

];


@NgModule({
  declarations: [
  ],
  imports: [
    RouterModule.forRoot(root),
    CommonModule,
    AuthModule,
  ]
})
export class AppRoutingModule {
}
