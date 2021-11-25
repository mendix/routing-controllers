import { getMetadataArgsStorage } from "../../index";

/**
 * Registers a global interceptor.
 */
export function Interceptor(options?: { priority?: number }): ClassDecorator {
    return (target: Function) => {
        getMetadataArgsStorage().interceptors.push({
            target: target,
            global: true,
            priority: options && options.priority ? options.priority : 0
        });
    };
}
