import { getMetadataArgsStorage } from "../../index";
import { ControllerOptions } from "../../decorator-options/ControllerOptions";
import { SMethodDecorator } from "../../util/decoratorHelpers";

/**
 * Registers an action to be executed when a request comes on a given route.
 * Must be applied on a controller action.
 */
export function All(route?: RegExp): SMethodDecorator;

/**
 * Registers an action to be executed when a request comes on a given route.
 * Must be applied on a controller action.
 */
export function All(route?: string): SMethodDecorator;

/**
 * Registers an action to be executed when a request comes on a given route.
 * Must be applied on a controller action.
 */
export function All(route?: string | RegExp, options?: ControllerOptions): SMethodDecorator {
    return (object: Object, methodName: string) => {
        getMetadataArgsStorage().actions.push({
            type: "all",
            target: object.constructor,
            method: methodName,
            route,
            options
        });
    };
}
