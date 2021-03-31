import { Injectable } from '@angular/core';
import {ModulesQueryStoreService} from "../query/modules-query-store.service";
import {ModulesViewStoreService} from "../view/modules-view-store.service";
import {API} from "../../../api/api.service";
import {catchError, switchMap, take, tap} from "rxjs/operators";
import {ModuleConfig, ModuleListResponse} from "../../../../../../src/routes/module/module-list";
import {HttpErrorResponse} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {ModuleState} from "../../interfaces/modules.state";
import {ModuleCreateRequest} from "../../../../../../src/routes/module/create-module";

@Injectable({
  providedIn: 'root',
})
export class ModulesStoreHelperService {

  constructor(
    private readonly _query: ModulesQueryStoreService,
    private readonly _view: ModulesViewStoreService,
    private readonly _api: API,
  ) { }

  public uploadModules$(): Observable<ModuleState[] | HttpErrorResponse | undefined> {
    this._query.startLoadingModules();

    return this._api.MODULE.get$().pipe(
      take(1),
      tap((res: ModuleListResponse) => this._query.setModules(res)),
      catchError((error: HttpErrorResponse) => {
        this._query.setErrorLoadingModules(error);

        return of(undefined);
      }),
      switchMap(() => this._view.allModules$),
    );
  }

  public createModule$(payload: ModuleCreateRequest): Observable<ModuleConfig | undefined> {
    this._query.createModule(payload);
      return this._api.MODULE.CREATE.put$(payload).pipe(
        take(1),
        tap((config: ModuleConfig) => this._query.addModule(config)),
        switchMap((config: ModuleConfig) => this._view.getModuleById$(config._id)),
        catchError(() => of(undefined)),
      );
  }
}
