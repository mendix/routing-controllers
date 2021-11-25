import { ParamOptions } from "../../decorator-options/ParamOptions";
import { getMetadataArgsStorage } from "../../index";
import { SParameterDecorator } from "../../util/decoratorHelpers";

/**
 * Injects all request's query parameters to the controller action parameter.
 * Must be applied on a controller action parameter.
 */
export function QueryParams(options?: ParamOptions): SParameterDecorator {
    return (object: Object, methodName: string, index: number) => {
        getMetadataArgsStorage().params.push({
            type: "queries",
            object: object,
            method: methodName,
            index: index,
            name: "",
            parse: options?.parse ?? false,
            required: options?.required,
            classTransform: options?.transform,
            explicitType: options?.type,
            validate: options?.validate
        });
    };
}
