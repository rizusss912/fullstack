import express, {Router} from "express";
import {RequestProcessingFactory} from "../../middleware/request-processing.factory";
import {createModule} from "./create-module";
import {Action} from "../../enums/Action.enum";
import {getModuleListByAuthorized, getModuleListByUnauthorized} from "./module-list";
import {deleteModule} from "./delete-module";
import {patchModule} from "./patch-module";

const router: Router = express.Router();
export const MODULE_ID_PARAMS_NAME = 'module_id';

router.put('/create', RequestProcessingFactory.onlyAdmin(createModule, Action.createModule));
router.get('', RequestProcessingFactory.maybeAuthorized(getModuleListByUnauthorized, getModuleListByAuthorized));
router.delete(`/:${MODULE_ID_PARAMS_NAME}`, RequestProcessingFactory.onlyAdmin(deleteModule, Action.deleteModule));
router.patch(`/:${MODULE_ID_PARAMS_NAME}`, RequestProcessingFactory.onlyAdmin(patchModule, Action.patchModule));

export const moduleRouter: Router = router;
