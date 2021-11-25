import { getMetadataArgsStorage } from "../../index";
import { SMethodDecorator } from "../../util/decoratorHelpers";

/**
 * Used to set specific HTTP status code when result returned by a controller action is equal to undefined.
 * Must be applied on a controller action.
 */
export function OnUndefined(code: number): SMethodDecorator;

/**
 * Used to set specific HTTP status code when result returned by a controller action is equal to undefined.
 * Must be applied on a controller action.
 */
export function OnUndefined(error: Function): SMethodDecorator;

/**
 * Used to set specific HTTP status code when result returned by a controller action is equal to undefined.
 * Must be applied on a controller action.
 */
export function OnUndefined(codeOrError: number | Function): SMethodDecorator {
    return (object: Object, methodName: string) => {
        getMetadataArgsStorage().responseHandlers.push({
            type: "on-undefined",
            target: object.constructor,
            method: methodName,
            value: codeOrError
        });
    };
}
