import { getMetadataArgsStorage } from "../../index";
import { SMethodDecorator } from "../../util/decoratorHelpers";

/**
 * Marks controller action to have a special access.
 * Authorization logic must be defined in routing-controllers settings.
 */
export function Authorized(): Function;

/**
 * Marks controller action to have a special access.
 * Authorization logic must be defined in routing-controllers settings.
 */
export function Authorized(role: any): Function;

/**
 * Marks controller action to have a special access.
 * Authorization logic must be defined in routing-controllers settings.
 */
export function Authorized(roles: any[]): SMethodDecorator;

/**
 * Marks controller action to have a special access.
 * Authorization logic must be defined in routing-controllers settings.
 */
export function Authorized(role: Function): SMethodDecorator;

/**
 * Marks controller action to have a special access.
 * Authorization logic must be defined in routing-controllers settings.
 */
export function Authorized(roleOrRoles?: string | string[] | Function): SMethodDecorator {
    return (clsOrObject: Function | Object, method?: string) => {
        getMetadataArgsStorage().responseHandlers.push({
            type: "authorized",
            target: method ? clsOrObject.constructor : (clsOrObject as Function),
            method: method,
            value: roleOrRoles
        });
    };
}
