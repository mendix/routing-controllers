/**
 * Metadata used to store registered middlewares.
 */
export interface MiddlewareMetadata {
    
    /**
     * Object class of the middleware class.
     */
    target: Function;
    
    /**
     * Middleware name.
     */
    name: string;

    /**
     * Execution priority of the middleware.
     */
    priority: number;

    /**
     * List of routes to which this middleware is applied.
     */
    routes: string[];
    
}