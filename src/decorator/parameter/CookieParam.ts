import { ParamOptions } from "../../decorator-options/ParamOptions";
import { getMetadataArgsStorage } from "../../index";
import { SParameterDecorator } from "../../util/decoratorHelpers";

/**
 * Injects a request's cookie value to the controller action parameter.
 * Must be applied on a controller action parameter.
 */
export function CookieParam(name: string, options?: ParamOptions): SParameterDecorator {
    return (object: Object, methodName: string, index: number) => {
        getMetadataArgsStorage().params.push({
            type: "cookie",
            object: object,
            method: methodName,
            index: index,
            name: name,
            parse: options?.parse ?? false,
            required: options?.required,
            explicitType: options?.type,
            classTransform: options?.transform,
            validate: options?.validate
        });
    };
}
