import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {RouterModule} from "@angular/router";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MainModule} from "./pages/main/main.module";
import {AuthInterceptor} from "./interseptors/auth.interceptor";
import {RefreshInterceptor} from "./interseptors/refresh.interceptor";
import {AuthGuard} from "./guards/auth.guard";
import { AdminPanelComponent } from './pages/main/pages/admin-panel/admin-panel.component';
import {AdminGuard} from "./guards/admin.guard";
import { BasketComponent } from './pages/main/pages/basket/basket.component';
import { ProductsComponent } from './pages/main/pages/products/products.component';
import {StoreModule} from "@ngrx/store";
import {appReducers} from "./store/reducers/app.reducers";
import {EffectsModule} from "@ngrx/effects";
import {ModulesEffects} from "./store/effects/modules.effects";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,
    MainModule,
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([ModulesEffects]),
  ],
  providers: [
    AuthGuard,
    AdminGuard,
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: AuthInterceptor,
    },
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: RefreshInterceptor,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
