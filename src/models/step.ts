import {Schema} from "mongoose";
import * as mongoose from "mongoose";
import {Model} from "./enums/model.enum";
import {StepModel} from "./interfaces/step.model";
import {generalPartOfSchemaForModuleObjects} from "./interfaces/abstract-module-object";

const stepSchema = new Schema<StepModel>({
    ...generalPartOfSchemaForModuleObjects,
    fields: {
        type: [Schema.Types.ObjectId],
        default: [],
        ref: Model.StepField,
    },
});

export const Step = mongoose.model<StepModel & Document>(Model.Step, stepSchema);
