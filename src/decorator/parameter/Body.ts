import { BodyOptions } from "../../decorator-options/BodyOptions";
import { getMetadataArgsStorage } from "../../index";
import { SParameterDecorator } from "../../util/decoratorHelpers";

/**
 * Allows to inject a request body value to the controller action parameter.
 * Must be applied on a controller action parameter.
 */
export function Body(options?: BodyOptions): SParameterDecorator {
    return (object: Object, methodName: string, index: number) => {
        getMetadataArgsStorage().params.push({
            type: "body",
            object: object,
            method: methodName,
            index: index,
            parse: false,
            required: options?.required,
            classTransform: options?.transform,
            validate: options?.validate,
            explicitType: options?.type,
            extraOptions: options?.options
        });
    };
}
