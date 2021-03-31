import {Injectable} from "@angular/core";
import {Actions} from "@ngrx/effects";
import {AppState} from "../interfaces/app.state";
import {Store} from "@ngrx/store";
import {API} from "../../api/api.service";

@Injectable()
export class ModulesEffects {
  constructor(
    private readonly api: API,
    private readonly _actions$: Actions,
    private readonly _store: Store<AppState>,
  ) {
  }
}
