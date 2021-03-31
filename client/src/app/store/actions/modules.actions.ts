import {Action} from "@ngrx/store";
import {ModuleConfig} from "../../../../../src/routes/module/module-list";
import {HttpErrorResponse} from "@angular/common/http";
import {ModuleCreateRequest} from "../../../../../src/routes/module/create-module";
export enum ModulesActionsTypes {
  StartLoadingModules = '[Modules] Start loading modules by backend',
  SetModules = '[Modules] Set valid modules list',
  SetErrorModules = '[Modules] Set http error modules loading',
  CreateModule = '[Modules] Create module',
  AddModule = '[Modules] Add module',
}

export class StartLoadingModules implements Action {
  public readonly type = ModulesActionsTypes.StartLoadingModules;
}

export class SetModules implements Action {
  public readonly type = ModulesActionsTypes.SetModules;

  constructor(public readonly payload: ModuleConfig[]) {
  }
}

export class SetErrorModules implements Action {
  public readonly type = ModulesActionsTypes.SetErrorModules;

  constructor(public readonly payload: HttpErrorResponse) {
  }
}

export class CreateModule implements Action {
  public readonly type = ModulesActionsTypes.CreateModule;

  constructor(public readonly payload: ModuleCreateRequest) {
  }
}

export class AddModule implements Action {
  public readonly type = ModulesActionsTypes.AddModule;

  constructor(public readonly payload: ModuleConfig) {
  }
}

export type ModulesAction =
  (
    StartLoadingModules
    | SetModules
    | SetErrorModules
    | CreateModule
    | AddModule
    )
  & { payload: any };
