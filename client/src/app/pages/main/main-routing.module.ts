import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";

import {PersonalOfficeModule} from "./pages/personal-office/personal-office.module";
import {PersonalOfficeComponent} from "./pages/personal-office/personal-office.component";
import {MainComponent} from "./main.component";
import {AuthGuard} from "../../guards/auth.guard";
import {AdminPanelComponent} from "./pages/admin-panel/admin-panel.component";
import {AdminPanelModule} from "./pages/admin-panel/admin-panel.module";
import {AdminGuard} from "../../guards/admin.guard";
import {DefaultComponent} from "./pages/default/default.component";
import {DefaultModule} from "./pages/default/default.module";
import {ProductsModule} from "./pages/products/products.module";
import {BasketModule} from "./pages/basket/basket.module";
import {BasketComponent} from "./pages/basket/basket.component";
import {ProductsComponent} from "./pages/products/products.component";

const ROUTES: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        component: DefaultComponent,
      },
      {
        path: 'basket',
        component: BasketComponent,
      },
      {
        path: 'products',
        component: ProductsComponent,
      },
      {
        path: 'lk',
        component: PersonalOfficeComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
      },
      {
        path: 'admin',
        component: AdminPanelComponent,
        canActivate: [AuthGuard, AdminGuard],
        canActivateChild: [AuthGuard, AdminGuard],
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    PersonalOfficeModule,
    AdminPanelModule,
    DefaultModule,
    ProductsModule,
    BasketModule,
  ]
})
export class MainRoutingModule {
}
