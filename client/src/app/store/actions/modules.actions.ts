import {Action} from "@ngrx/store";
import {ModuleConfig} from "../../../../../src/routes/module/module-list";
import {HttpErrorResponse} from "@angular/common/http";
import {ModuleCreateRequest} from "../../../../../src/routes/module/create-module";
import {DataStatus} from "../enums/data-status";

export enum ModulesActionsTypes {
  StartLoadingModules = '[Modules] Start loading modules by backend',
  SetModules = '[Modules] Set valid modules list',
  SetErrorModules = '[Modules] Set http error modules loading',
  CreateModule = '[Modules] Create module by backend',
  AddModule = '[Modules] Add module to modules list',
  DeleteModuleById = '[Modules] Delete module in list',
  SetDataStatusByModuleId = '[Modules] Set data status to module',
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

export class DeleteModuleById implements Action {
  public readonly type = ModulesActionsTypes.DeleteModuleById;

  constructor(public readonly payload: string) {
  }
}

export class SetDataStatusByModuleId implements Action {
  public readonly type = ModulesActionsTypes.SetDataStatusByModuleId;

  constructor(public readonly payload: { _id: string, status: DataStatus }) {
  }
}


export type ModulesAction =
  (
    StartLoadingModules
    | SetModules
    | SetErrorModules
    | CreateModule
    | AddModule
    | DeleteModuleById
    | SetDataStatusByModuleId
    )
  & { payload: any };
