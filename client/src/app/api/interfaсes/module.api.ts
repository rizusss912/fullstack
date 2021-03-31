import {Observable} from "rxjs";
import {ModuleConfig, ModuleListResponse} from "../../../../../src/routes/module/module-list";
import {ModuleCreateRequest} from "../../../../../src/routes/module/create-module";

export interface ModuleApi {
  CREATE: {
    put$(body: ModuleCreateRequest): Observable<ModuleConfig>,
  },

  get$(): Observable<ModuleListResponse>,
}
