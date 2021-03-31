import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {UserLoginRequest} from "../../../../../src/routes/auth/interfaces/user-login-request";
import {map, merge, take, tap} from "rxjs/operators";
import {getLocalStorageObservable} from "./functions/get-local-storage-observable";
import {AuthorisationData} from "../../../../../src/routes/auth/functions/get-authorisation-by-user-model";
import {Status} from "../../../../../src/models/enums/status.enum";
import {Router} from "@angular/router";
import {API} from "../../api/api.service";

const ACCESS_TOKEN_LOCAL_STORAGE_NAME = 'access_token';
const REFRESH_TOKEN_LOCAL_STORAGE_NAME = 'refresh_token';
const STATUSES_LOCAL_STORAGE_NAME = 'statuses';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly _isLoadingRefresh$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private readonly _isAuthorized$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isAuthorized);
  private readonly _hasAccessTokenInLocalStorage$: Observable<boolean> = this.hasAccessTokenInLocalStorage$;

  constructor(
    private readonly api: API,
    private readonly http: HttpClient,
    private readonly router: Router,
  ) {
  }

  public get isLoadingRefresh$(): Observable<boolean> {
    return this._isLoadingRefresh$.asObservable();
  }

  public get isLoadingRefresh(): boolean {
    return this._isLoadingRefresh$.getValue();
  }

  public get isAuthorized$(): Observable<boolean> {
    return this._isAuthorized$.asObservable().pipe(
      merge(this._hasAccessTokenInLocalStorage$),
    );
  }

  public get isAuthorized(): boolean {
    return !!this.token;
  }

  public unauthorized(): void {
    this.clearAuthData();
    this.router.navigate(['']);
  }

  public authorization$(userData: UserLoginRequest): Observable<AuthorisationData> {
    return this.http.post<AuthorisationData>(this.api.AUTH.AUTHORIZATION, userData).pipe(
      take(1),
      tap((res: AuthorisationData) => this.saveAuthData(res)),
    );
  }

  // TODO: Сделать отдельные интерфейсы для регистрации
  public registration$(userData: UserLoginRequest): Observable<AuthorisationData> {
    return this.http.put<AuthorisationData>(this.api.AUTH.REGISTRATION, userData).pipe(
      take(1),
      tap((res: AuthorisationData) => this.saveAuthData(res)),
    );
  }

  public refreshTokens$(): Observable<AuthorisationData> {
    this._isLoadingRefresh$.next(true);
    const body = {refresh_token: this.refresh_token};

    return this.http.post<AuthorisationData>(this.api.AUTH.REFRESH_TOKENS, body).pipe(
      take(1),
      tap((res: AuthorisationData) => this.saveAuthData(res)),
      tap(
        () => this._isLoadingRefresh$.next(false),
        () => this._isLoadingRefresh$.next(false),
      ),
    );
  }

  public clearAuthData(): void {
    this._isAuthorized$.next(false);
    localStorage.removeItem(ACCESS_TOKEN_LOCAL_STORAGE_NAME);
    localStorage.removeItem(REFRESH_TOKEN_LOCAL_STORAGE_NAME);
    localStorage.removeItem(STATUSES_LOCAL_STORAGE_NAME);
  }

  private saveAuthData(data: AuthorisationData): void {
    this._isAuthorized$.next(true);
    localStorage.setItem(ACCESS_TOKEN_LOCAL_STORAGE_NAME, data.access_token);
    localStorage.setItem(REFRESH_TOKEN_LOCAL_STORAGE_NAME, data.refresh_token);
    !!data.statuses ? localStorage.setItem(STATUSES_LOCAL_STORAGE_NAME, data.statuses.join(', ')) : localStorage.removeItem(STATUSES_LOCAL_STORAGE_NAME);
  }

  public get token(): string | undefined {
    return localStorage.getItem(ACCESS_TOKEN_LOCAL_STORAGE_NAME);
  }

  public get isAdmin(): boolean {
    return this.statuses.includes(Status.Admin);
  }

  private get statuses(): Status[] {
    return localStorage.getItem(STATUSES_LOCAL_STORAGE_NAME)?.split(', ').map(status => Status[status]) || [];
  }

  private get refresh_token(): string | undefined {
    return localStorage.getItem(REFRESH_TOKEN_LOCAL_STORAGE_NAME);
  }

  private get hasAccessTokenInLocalStorage$(): Observable<boolean> {
    return getLocalStorageObservable(ACCESS_TOKEN_LOCAL_STORAGE_NAME).pipe(
      map((event: StorageEvent) => !!event.newValue),
    );
  }
}
