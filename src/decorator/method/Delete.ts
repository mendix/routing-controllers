import { HandlerOptions } from "../../decorator-options/HandlerOptions";
import { getMetadataArgsStorage } from "../../index";
import { SMethodDecorator } from "../../util/decoratorHelpers";

/**
 * Registers a controller method to be executed when DELETE request comes on a given route.
 * Must be applied on a controller action.
 */
export function Delete(route?: RegExp, options?: HandlerOptions): SMethodDecorator;

/**
 * Registers a controller method to be executed when DELETE request comes on a given route.
 * Must be applied on a controller action.
 */
export function Delete(route?: string, options?: HandlerOptions): SMethodDecorator;

/**
 * Registers a controller method to be executed when DELETE request comes on a given route.
 * Must be applied on a controller action.
 */
export function Delete(route?: string | RegExp, options: HandlerOptions = {}): SMethodDecorator {
    return (object: Object, methodName: string) => {
        getMetadataArgsStorage().actions.push({
            type: "delete",
            target: object.constructor,
            method: methodName,
            route: route,
            options
        });
    };
}
