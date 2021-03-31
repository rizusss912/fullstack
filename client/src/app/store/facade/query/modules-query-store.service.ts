import {Injectable} from '@angular/core';
import {AppState} from "../../interfaces/app.state";
import {Store} from "@ngrx/store";
import {
  AddModule,
  CreateModule, DeleteModuleById,
  SetDataStatusByModuleId,
  SetErrorModules,
  SetModules,
  StartLoadingModules
} from "../../actions/modules.actions";
import {HttpErrorResponse} from "@angular/common/http";
import {ModuleConfig} from "../../../../../../src/routes/module/module-list";
import {ModuleCreateRequest} from "../../../../../../src/routes/module/create-module";
import {DataStatus} from "../../enums/data-status";

@Injectable({
  providedIn: 'root'
})
export class ModulesQueryStoreService {
  constructor(
    private readonly _store: Store<AppState>,
  ) {
  }

  public startLoadingModules(): void {
    this._store.dispatch(new StartLoadingModules());
  }

  public setErrorLoadingModules(error: HttpErrorResponse): void {
    this._store.dispatch(new SetErrorModules(error));
  }

  public setModules(modules: ModuleConfig[]): void {
    this._store.dispatch(new SetModules(modules));
  }

  public createModule(req: ModuleCreateRequest): void {
    this._store.dispatch(new CreateModule(req));
  }

  public addModule(module: ModuleConfig): void {
    this._store.dispatch(new AddModule(module));
  }

  public setDataStatusByModuleId(_id: string, status: DataStatus): void {
    this._store.dispatch(new SetDataStatusByModuleId({_id, status}));
  }

  public deleteModuleById(_id: string): void {
    this._store.dispatch(new DeleteModuleById(_id));
  }
}
