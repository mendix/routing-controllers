import { getMetadataArgsStorage } from "../../index";
import { SMethodDecorator } from "../../util/decoratorHelpers";

/**
 * Sets response header.
 * Must be applied on a controller action.
 */
export function Header(name: string, value: string): SMethodDecorator {
    return (object: Object, methodName: string) => {
        getMetadataArgsStorage().responseHandlers.push({
            type: "header",
            target: object.constructor,
            method: methodName,
            value: name,
            secondaryValue: value
        });
    };
}
