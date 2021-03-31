import {Injectable} from "@angular/core";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, filter, switchMap, take} from "rxjs/operators";
import {AuthService} from "../services/auth/auth.service";
import {setAuthorizationHeader} from "./functiuns/set-authorization-header";
import {Router} from "@angular/router";

@Injectable()
export class RefreshInterceptor implements HttpInterceptor {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
          if (error.status === 401 && this.authService.isAuthorized) {
            return this.authService.isLoadingRefresh ? this.waitAndRepeat$(req, next, error) : this.refreshAndRepeat$(req, next, error);
          } else {
            return throwError(error);
          }
        }
      ),
    );
  }

  private refreshAndRepeat$(req: HttpRequest<any>, next: HttpHandler, error: HttpErrorResponse): Observable<HttpEvent<any>> {
    return this.authService.refreshTokens$().pipe(
      catchError(() => {
        this.authService.clearAuthData();
        this.router.navigate(['/auth']);

        return throwError(error);
      }),
      switchMap(() => this.repeat$(req, next)),
    )
  }

  private waitAndRepeat$(req: HttpRequest<any>, next: HttpHandler, error: HttpErrorResponse): Observable<HttpEvent<any>> {
    return this.authService.isLoadingRefresh$.pipe(
      filter((isLoading: boolean) => !isLoading),
      take(1),
      switchMap(() => this.authService.isAuthorized ? this.repeat$(req, next) : throwError(error)),
    )
  }

  private repeat$(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(setAuthorizationHeader(req, this.authService.token));
  }
}
