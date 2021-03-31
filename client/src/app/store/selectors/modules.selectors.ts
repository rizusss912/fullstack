import {AppState} from "../interfaces/app.state";
import {createSelector} from "@ngrx/store";
import {ModulesState} from "../interfaces/modules.state";

const selectModules = (state: AppState) => state.modules;

export const selectModulesStatus = createSelector(
  selectModules,
  (state: ModulesState) => state.status
);

export const selectModulesList = createSelector(
  selectModules,
  (state: ModulesState) => state.modules
);
