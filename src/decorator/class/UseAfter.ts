import { getMetadataArgsStorage } from "../../index";

/**
 * Specifies a given middleware to be used for controller or controller action AFTER the action executes.
 * Must be set to controller action or controller class.
 */
export function UseAfter(...middlewares: Array<Function>): ClassDecorator;

/**
 * Specifies a given middleware to be used for controller or controller action AFTER the action executes.
 * Must be set to controller action or controller class.
 */
export function UseAfter(...middlewares: Array<(context: any, next: () => Promise<any>) => Promise<any>>): ClassDecorator;

/**
 * Specifies a given middleware to be used for controller or controller action AFTER the action executes.
 * Must be set to controller action or controller class.
 */
export function UseAfter(...middlewares: Array<(request: any, response: any, next: Function) => any>): ClassDecorator;

/**
 * Specifies a given middleware to be used for controller or controller action AFTER the action executes.
 * Must be set to controller action or controller class.
 */
export function UseAfter(...middlewares: Array<Function | ((request: any, response: any, next: Function) => any)>): ClassDecorator {
    return function (objectOrFunction: Object | Function, methodName?: string) {
        middlewares.forEach(middleware => {
            getMetadataArgsStorage().uses.push({
                target: methodName ? objectOrFunction.constructor : (objectOrFunction as Function),
                method: methodName,
                middleware: middleware,
                afterAction: true
            });
        });
    };
}