import {Injectable} from '@angular/core';
import {ModulesQueryStoreService} from "../query/modules-query-store.service";
import {ModulesViewStoreService} from "../view/modules-view-store.service";
import {API} from "../../../api/api.service";
import {catchError, mapTo, switchMap, take, tap} from "rxjs/operators";
import {ModuleConfig, ModuleListResponse} from "../../../../../../src/routes/module/module-list";
import {HttpErrorResponse} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {ModuleState} from "../../interfaces/modules.state";
import {ModuleCreateRequest} from "../../../../../../src/routes/module/create-module";
import {DataStatus} from "../../enums/data-status";
import {PatchModuleRequest} from "../../../../../../src/routes/module/patch-module";

@Injectable({
  providedIn: 'root',
})
export class ModulesStoreHelperService {

  constructor(
    private readonly _query: ModulesQueryStoreService,
    private readonly _view: ModulesViewStoreService,
    private readonly _api: API,
  ) {
  }

  public uploadModules$(): Observable<ModuleState[] | HttpErrorResponse | undefined> {
    this._query.startLoadingModules();

    return this._api.MODULE.get$().pipe(
      take(1),
      tap(
        (res: ModuleListResponse) => this._query.setModules(res),
        (error: HttpErrorResponse) => this._query.setErrorLoadingModules(error),
      ),
      switchMap(() => this._view.allModules$),
    );
  }

  public createModule$(payload: ModuleCreateRequest): Observable<ModuleConfig> {
    this._query.createModule(payload);
    return this._api.MODULE.CREATE.put$(payload).pipe(
      take(1),
      tap((config: ModuleConfig) => this._query.addModule(config)),
      switchMap((config: ModuleConfig) => this._view.getModuleById$(config._id)),
    );
  }

  public deleteModule$(_id: string): Observable<ModuleConfig | undefined> {
    this._query.setDataStatusByModuleId(_id, DataStatus.Updated);

    return this._api.MODULE.delete$(_id).pipe(
      take(1),
      tap(
        (config: ModuleConfig) => this._query.deleteModuleById(_id),
        () => this._query.setDataStatusByModuleId(_id, DataStatus.Valid),
      ),
      switchMap(() =>  this._view.getModuleById$(_id)),
    );
  }

  public patchModule$(_id: string, patch: PatchModuleRequest): Observable<ModuleConfig | undefined> {
    this._query.setDataStatusByModuleId(_id, DataStatus.Updated);

    return this._api.MODULE.patch$(_id, patch).pipe(
      take(1),
      tap(
        (config: ModuleConfig) => this._query.addModule(config),
        () => this._query.setDataStatusByModuleId(_id, DataStatus.Valid),
      ),
      switchMap(() =>  this._view.getModuleById$(_id)),
    );
  }
}
