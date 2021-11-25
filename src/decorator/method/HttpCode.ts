import { getMetadataArgsStorage } from "../../index";
import { SMethodDecorator } from "../../util/decoratorHelpers";

/**
 * Sets response HTTP status code.
 * Http code will be set only when controller action is successful.
 * In the case if controller action rejects or throws an exception http code won't be applied.
 * Must be applied on a controller action.
 */
export function HttpCode(code: number): SMethodDecorator {
    return (object: Object, methodName: string) => {
        getMetadataArgsStorage().responseHandlers.push({
            type: "success-code",
            target: object.constructor,
            method: methodName,
            value: code
        });
    };
}
