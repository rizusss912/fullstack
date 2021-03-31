import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import {MatSliderModule} from "@angular/material/slider";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    DefaultComponent,
  ],
    imports: [
        CommonModule,
        MatSliderModule,
        RouterModule,
    ]
})
export class DefaultModule { }
