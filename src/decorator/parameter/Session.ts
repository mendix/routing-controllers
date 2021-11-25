import { ParamOptions } from "../../decorator-options/ParamOptions";
import { getMetadataArgsStorage } from "../../index";
import { SParameterDecorator } from "../../util/decoratorHelpers";

/**
 * Injects a Session object to the controller action parameter.
 * Must be applied on a controller action parameter.
 */
export function Session(options?: ParamOptions): SParameterDecorator {
    return (object: Object, methodName: string, index: number) => {
        getMetadataArgsStorage().params.push({
            type: "session",
            object: object,
            method: methodName,
            index: index,
            parse: false, // it makes no sense for Session object to be parsed as json
            required: options?.required ?? true,
            classTransform: options?.transform,
            validate: options?.validate ?? false
        });
    };
}
