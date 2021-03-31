import {ModulesState} from "../interfaces/modules.state";
import {DataStatus} from "../enums/data-status";

export const initialModulesState: ModulesState = {
  status: DataStatus.Undefined,
  modules: undefined,
}
