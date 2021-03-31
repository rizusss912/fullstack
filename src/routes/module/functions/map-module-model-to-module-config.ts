import {ModuleModel} from "../../../models/interfaces/module.model";
import {ModuleConfig} from "../module-list";
import {copyKeys} from "./copy-keys";

export function mapModuleModelToModuleConfig(model: ModuleModel, isModerator: boolean = false, canChangeModule: boolean = false): ModuleConfig {
    const config: ModuleConfig = isModerator
        ? copyKeys(model, 'title', 'description', 'price', '_id', 'condition')
        : copyKeys(model, 'title', 'description', 'price', '_id');

    return Object.assign(config, {canChangeModule});
}
