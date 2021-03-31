import {ModulesState, ModuleState} from "../interfaces/modules.state";
import {initialModulesState} from "../configs/initial-modules.state";
import {ModulesAction, ModulesActionsTypes} from "../actions/modules.actions";
import {DataStatus} from "../enums/data-status";
import {ModuleConfig} from "../../../../../src/routes/module/module-list";

export function modulesReducers(state: ModulesState = initialModulesState, action: ModulesAction): ModulesState {
  const modulesReducersMap: Record<ModulesActionsTypes, (state: ModulesState) => ModulesState> = {
    [ModulesActionsTypes.StartLoadingModules](state: ModulesState) {
      return {
        ...state,
        status: state.modules ? DataStatus.Updated : DataStatus.Loading,
      };
    },
    [ModulesActionsTypes.SetModules](state: ModulesState) {
      return {
        ...state,
        modules: action.payload.map((config: ModuleConfig) => {
          return {status: DataStatus.Valid, data: config}
        }),
        status: DataStatus.Valid,
      };
    },
    [ModulesActionsTypes.SetErrorModules](state: ModulesState) {
      return {
        ...state,
        modules: action.payload,
        status: DataStatus.LoadingError,
      };
    },
    [ModulesActionsTypes.CreateModule](state: ModulesState) {
      return state;
    },
    [ModulesActionsTypes.AddModule](state: ModulesState) {
      const module: ModuleState = {
        status: DataStatus.Valid,
        data: action.payload,
      };

      return Array.isArray(state.modules)
        ? {
          ...state,
          modules: state.modules.concat([module]),
        }
        : {
          ...state,
          status: DataStatus.Valid,
          modules: [module],
        };
    },
  };

  return !!modulesReducersMap[action.type] ? modulesReducersMap[action.type](state) : state;
}
