import {Injectable} from '@angular/core';
import {AuthApi} from "./interfaсes/auth-api";
import {UserApi} from "./interfaсes/user-api";
import {BACKAND} from "../../../../src/configs/servers";
import {ModuleCreateRequest} from "../../../../src/routes/module/create-module";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ModuleConfig, ModuleListResponse} from "../../../../src/routes/module/module-list";
import {ModuleModel} from "../../../../src/models/interfaces/module.model";
import {PatchModuleRequest} from "../../../../src/routes/module/patch-module";

@Injectable({
  providedIn: 'root'
})
export class API {
  constructor(
    private readonly http: HttpClient,
  ) {
  }

  private readonly root = `${BACKAND.url}/api`;

  public get AUTH(): AuthApi {
    const auth = `${this.root}/auth`;

    return {
      AUTHORIZATION: `${auth}/login`,
      REGISTRATION: `${auth}/register`,
      REFRESH_TOKENS: `${auth}/refresh`,
    }
  }

  public get USER(): UserApi {
    const user = `${this.root}/user`;

    return {
      INFO: `${user}/info`,
    }
  }

  public get MODULE() {
    const url = `${this.root}/module`;
    const http = this.http;

    return {
      CREATE: {
        put$(body: ModuleCreateRequest): Observable<ModuleConfig> {
          return http.put<ModuleConfig>(`${url}/create`, body);
        }
      },
      delete$(_id: string): Observable<null> {
        return http.delete<null>(`${url}/${_id}`);
      },
      patch$(_id: string, patch: PatchModuleRequest): Observable<ModuleConfig> {
        return  http.patch<ModuleConfig>(`${url}/${_id}`, patch);
      },
      get$(): Observable<ModuleListResponse> {
        return http.get<ModuleListResponse>(url);
      },
    }
  }
}
