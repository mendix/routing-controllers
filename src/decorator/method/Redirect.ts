import { getMetadataArgsStorage } from "../../index";
import { SMethodDecorator } from "../../util/decoratorHelpers";

/**
 * Sets Redirect header with given value to the response.
 * Must be applied on a controller action.
 */
export function Redirect(url: string): SMethodDecorator {
    return (object: Object, methodName: string) => {
        getMetadataArgsStorage().responseHandlers.push({
            type: "redirect",
            target: object.constructor,
            method: methodName,
            value: url
        });
    };
}
