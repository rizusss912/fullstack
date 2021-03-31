import {Injectable} from "@angular/core";
import {AuthService} from "../services/auth/auth.service";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {setAuthorizationHeader} from "./functiuns/set-authorization-header";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private readonly authService: AuthService,
  ) {
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.isAuthorized) {
      return next.handle(setAuthorizationHeader(req, this.authService.token));
    }

    return next.handle(req);
  }
}
