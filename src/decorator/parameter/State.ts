import { getMetadataArgsStorage } from "../../index";
import { SParameterDecorator } from "../../util/decoratorHelpers";

/**
 * Injects a State object to the controller action parameter.
 * Must be applied on a controller action parameter.
 */
export function State(objectName?: string): SParameterDecorator {
    return (object: Object, methodName: string, index: number) => {
        getMetadataArgsStorage().params.push({
            type: "state",
            object: object,
            method: methodName,
            index: index,
            name: objectName,
            parse: false, // it does not make sense for Session to be parsed
            required: true, // when we demand session object, it must exist (working session middleware)
            classTransform: undefined
        });
    };
}