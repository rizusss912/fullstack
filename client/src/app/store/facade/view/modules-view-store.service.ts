import {Injectable} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {AppState} from "../../interfaces/app.state";
import {Observable} from "rxjs";
import {selectModulesList, selectModulesStatus} from "../../selectors/modules.selectors";
import {HttpErrorResponse} from "@angular/common/http";
import {ModuleState} from "../../interfaces/modules.state";
import {DataStatus} from "../../enums/data-status";
import {ModuleConfig} from "../../../../../../src/routes/module/module-list";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ModulesViewStoreService {

  constructor(
    private readonly _store: Store<AppState>,
  ) {
  }

  public get allModules$(): Observable<ModuleState[] | HttpErrorResponse | undefined> {
    return this._store.pipe(
      select(selectModulesList),
    )
  }

  public get modulesStatus$(): Observable<DataStatus> {
    return this._store.pipe(
      select(selectModulesStatus),
    )
  }

  public getModuleById$(_id: string): Observable<ModuleConfig | undefined> {
    return this.getModuleStateById$(_id).pipe(
      map((state: ModuleState | undefined) => state?.data)
    );
  }

  public getModuleStatusById$(_id: string): Observable<DataStatus> {
    return this.getModuleStateById$(_id).pipe(
      map((state: ModuleState | undefined) => state?.status || DataStatus.Undefined)
    );
  }

  private getModuleStateById$(_id: string): Observable<ModuleState | undefined> {
    return this.allModules$.pipe(
      map((list: ModuleState[] | HttpErrorResponse | undefined) =>
        Array.isArray(list)
          ? list.find((module: ModuleState) => _id === module.data._id)
          : undefined,
      ),
    );
  }
}
