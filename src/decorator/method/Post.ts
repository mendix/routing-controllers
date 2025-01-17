import { HandlerOptions } from "../../decorator-options/HandlerOptions";
import { getMetadataArgsStorage } from "../../index";
import { SMethodDecorator } from "../../util/decoratorHelpers";

/**
 * Registers an action to be executed when POST request comes on a given route.
 * Must be applied on a controller action.
 */
export function Post(route?: RegExp, options?: HandlerOptions): SMethodDecorator;

/**
 * Registers an action to be executed when POST request comes on a given route.
 * Must be applied on a controller action.
 */
export function Post(route?: string, options?: HandlerOptions): SMethodDecorator;

/**
 * Registers an action to be executed when POST request comes on a given route.
 * Must be applied on a controller action.
 */
export function Post(route?: string | RegExp, options: HandlerOptions = {}): SMethodDecorator {
    return (object: Object, methodName: string) => {
        getMetadataArgsStorage().actions.push({
            type: "post",
            target: object.constructor,
            method: methodName,
            options,
            route
        });
    };
}
