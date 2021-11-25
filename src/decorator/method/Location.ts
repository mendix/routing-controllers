import { getMetadataArgsStorage } from "../../index";
import { SMethodDecorator } from "../../util/decoratorHelpers";

/**
 * Sets Location header with given value to the response.
 * Must be applied on a controller action.
 */
export function Location(url: string): SMethodDecorator {
    return (object: Object, methodName: string) => {
        getMetadataArgsStorage().responseHandlers.push({
            type: "location",
            target: object.constructor,
            method: methodName,
            value: url
        });
    };
}
