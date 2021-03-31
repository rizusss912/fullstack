import {State} from "./state";
import {ModuleConfig} from "../../../../../src/routes/module/module-list";
import {HttpErrorResponse} from "@angular/common/http";

export interface ModuleState extends State {
  data: ModuleConfig | undefined;
}

export interface ModulesState extends State {
  modules: ModuleState[] | HttpErrorResponse | undefined,
}
