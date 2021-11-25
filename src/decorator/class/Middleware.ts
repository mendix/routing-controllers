import { getMetadataArgsStorage } from "../../index";

/**
 * Marks given class as a middleware.
 * Allows to create global middlewares and control order of middleware execution.
 */
export function Middleware(options: { type: "after" | "before"; priority?: number }): ClassDecorator {
    return (target: Function) => {
        getMetadataArgsStorage().middlewares.push({
            target: target,
            type: options?.type ?? "before",
            global: true,
            priority: options?.priority ?? 0
        });
    };
}
