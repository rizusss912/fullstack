import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProductsComponent} from "./products.component";
import { ModulesListComponent } from './components/modules-list/modules-list.component';
import { ModuleComponent } from './components/module/module.component';



@NgModule({
  declarations: [
    ProductsComponent,
    ModulesListComponent,
    ModuleComponent,
  ],
  imports: [
    CommonModule,
  ]
})
export class ProductsModule { }
