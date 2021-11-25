import { HandlerOptions } from "../../decorator-options/HandlerOptions";
import { getMetadataArgsStorage } from "../../index";
import { SMethodDecorator } from "../../util/decoratorHelpers";

/**
 * Registers an action to be executed when PUT request comes on a given route.
 * Must be applied on a controller action.
 */
export function Put(route?: RegExp, options?: HandlerOptions): SMethodDecorator;

/**
 * Registers an action to be executed when POST request comes on a given route.
 * Must be applied on a controller action.
 */
export function Put(route?: string, options?: HandlerOptions): SMethodDecorator;

/**
 * Registers an action to be executed when POST request comes on a given route.
 * Must be applied on a controller action.
 */
export function Put(route?: string | RegExp, options: HandlerOptions = {}): SMethodDecorator {
    return (object: Object, methodName: string) => {
        getMetadataArgsStorage().actions.push({
            type: "put",
            target: object.constructor,
            method: methodName,
            route: route,
            options
        });
    };
}
