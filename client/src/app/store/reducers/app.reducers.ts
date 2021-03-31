import {ActionReducerMap} from "@ngrx/store";
import {AppState} from "../interfaces/app.state";
import {modulesReducers} from "./modules.reducers";

export const appReducers: ActionReducerMap<AppState, any> = {
  modules: modulesReducers,
}
