import { ParamOptions } from "../../decorator-options/ParamOptions";
import { getMetadataArgsStorage } from "../../index";
import { SParameterDecorator } from "../../util/decoratorHelpers";

/**
 * Takes partial data of the request body.
 * Must be applied on a controller action parameter.
 */
export function BodyParam(name: string, options?: ParamOptions): SParameterDecorator {
    return (object: Object, methodName: string, index: number) => {
        getMetadataArgsStorage().params.push({
            type: "body-param",
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
