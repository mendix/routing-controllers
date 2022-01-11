import { CustomParameterDecorator } from "./CustomParameterDecorator";
import { BaseDriver } from "./driver/BaseDriver";
import { ExpressDriver } from "./driver/express/ExpressDriver";
import { MetadataArgsStorage } from "./metadata-builder/MetadataArgsStorage";
import { RoutingControllers } from "./RoutingControllers";
import { RoutingControllersOptions } from "./RoutingControllersOptions";
import { ValidationOptions } from "@nestjs/class-validator";
import { importClassesFromDirectories } from "./util/importClassesFromDirectories";

// -------------------------------------------------------------------------
// Main exports
// -------------------------------------------------------------------------

export * from "./container";

export * from "./decorator/method/All";
export * from "./decorator/method/Authorized";
export * from "./decorator/parameter/Body";
export * from "./decorator/parameter/BodyParam";
export * from "./decorator/method/ContentType";
export * from "./decorator/class/Controller";
export * from "./decorator/parameter/CookieParam";
export * from "./decorator/parameter/CookieParams";
export * from "./decorator/parameter/CurrentUser";
export * from "./decorator/method/Delete";
export * from "./decorator/method/Get";
export * from "./decorator/method/Head";
export * from "./decorator/method/Header";
export * from "./decorator/parameter/HeaderParam";
export * from "./decorator/parameter/HeaderParams";
export * from "./decorator/method/HttpCode";
export * from "./decorator/class/Interceptor";
export * from "./decorator/class/JsonController";
export * from "./decorator/method/Location";
export * from "./decorator/method/Method";
export * from "./decorator/class/Middleware";
export * from "./decorator/method/OnNull";
export * from "./decorator/method/OnUndefined";
export * from "./decorator/parameter/Param";
export * from "./decorator/parameter/Params";
export * from "./decorator/method/Patch";
export * from "./decorator/method/Post";
export * from "./decorator/method/Put";
export * from "./decorator/parameter/QueryParam";
export * from "./decorator/parameter/QueryParams";
export * from "./decorator/method/Redirect";
export * from "./decorator/method/Render";
export * from "./decorator/parameter/Req";
export * from "./decorator/parameter/Res";
export * from "./decorator/method/ResponseClassTransformOptions";
export * from "./decorator/parameter/Session";
export * from "./decorator/parameter/SessionParam";
export * from "./decorator/parameter/State";
export * from "./decorator/parameter/UploadedFile";
export * from "./decorator/parameter/UploadedFiles";
export * from "./decorator/class/UseAfter";
export * from "./decorator/class/UseBefore";
export * from "./decorator/class/UseInterceptor";

export * from "./decorator-options/BodyOptions";
export * from "./decorator-options/ParamOptions";
export * from "./decorator-options/UploadOptions";

export * from "./http-error/HttpError";
export * from "./http-error/InternalServerError";
export * from "./http-error/BadRequestError";
export * from "./http-error/ForbiddenError";
export * from "./http-error/NotAcceptableError";
export * from "./http-error/MethodNotAllowedError";
export * from "./http-error/NotFoundError";
export * from "./http-error/UnauthorizedError";

export * from "./driver/express/ExpressMiddlewareInterface";
export * from "./driver/express/ExpressErrorMiddlewareInterface";
export * from "./metadata-builder/MetadataArgsStorage";
export * from "./metadata/ActionMetadata";
export * from "./metadata/ControllerMetadata";
export * from "./metadata/InterceptorMetadata";
export * from "./metadata/MiddlewareMetadata";
export * from "./metadata/ParamMetadata";
export * from "./metadata/ResponseHandleMetadata";
export * from "./metadata/UseMetadata";

export * from "./RoutingControllersOptions";
export * from "./CustomParameterDecorator";
export * from "./RoleChecker";
export * from "./Action";
export * from "./InterceptorInterface";

export * from "./driver/BaseDriver";
export * from "./driver/express/ExpressDriver";

// -------------------------------------------------------------------------
// Main Functions
// -------------------------------------------------------------------------

/**
 * Gets metadata args storage.
 * Metadata args storage follows the best practices and stores metadata in a global variable.
 */
export function getMetadataArgsStorage(): MetadataArgsStorage {
    if (!(global as any).routingControllersMetadataArgsStorage) {
        (global as any).routingControllersMetadataArgsStorage = new MetadataArgsStorage();
    }

    return (global as any).routingControllersMetadataArgsStorage;
}

/**
 * Registers all loaded actions in your express application.
 */
export function useExpressServer<T>(expressServer: T, options?: RoutingControllersOptions): T {
    const driver = new ExpressDriver(expressServer);
    return createServer(driver, options);
}

/**
 * Registers all loaded actions in your express application.
 */
export function createExpressServer(options?: RoutingControllersOptions): any {
    const driver = new ExpressDriver();
    return createServer(driver, options);
}

/**
 * Registers all loaded actions in your application using selected driver.
 */
export function createServer<T extends BaseDriver>(driver: T, options?: RoutingControllersOptions): any {
    createExecutor(driver, options);
    return driver.app;
}

/**
 * Registers all loaded actions in your express application.
 */
export function createExecutor<T extends BaseDriver>(driver: T, options: RoutingControllersOptions = {}): void {
    // import all controllers and middlewares and error handlers (new way)
    let controllerClasses: Function[] = [];
    if (options?.controllers?.length) {
        controllerClasses = (options.controllers as any[]).filter(controller => controller instanceof Function);
        const controllerDirs = (options.controllers as any[]).filter(controller => typeof controller === "string");
        controllerClasses.push(...importClassesFromDirectories(controllerDirs));
    }

    let middlewareClasses: Function[] = [];
    if (options?.middlewares?.length) {
        middlewareClasses = (options.middlewares as any[]).filter(controller => controller instanceof Function);
        const middlewareDirs = (options.middlewares as any[]).filter(controller => typeof controller === "string");
        middlewareClasses.push(...importClassesFromDirectories(middlewareDirs));
    }

    let interceptorClasses: Function[] = [];
    if (options?.interceptors?.length) {
        interceptorClasses = options.interceptors?.filter(controller => controller instanceof Function) as Function[];
        const interceptorDirs = (options.interceptors as any[]).filter(controller => typeof controller === "string");
        interceptorClasses.push(...importClassesFromDirectories(interceptorDirs));
    }

    driver.developmentMode = options.development ?? process.env.NODE_ENV !== "production";
    driver.isDefaultErrorHandlingEnabled = options.defaultErrorHandler ?? true;
    driver.useClassTransformer = options.classTransformer ?? true;

    if (options.validation !== undefined) {
        driver.enableValidation = !!options.validation;

        if (options.validation instanceof Object) {
            driver.validationOptions = options.validation as ValidationOptions;
        }
    } else {
        driver.enableValidation = true;
    }

    driver.classToPlainTransformOptions = options.classToPlainTransformOptions;
    driver.plainToClassTransformOptions = options.plainToClassTransformOptions;
    driver.errorOverridingMap = options.errorOverridingMap ?? {};
    driver.routePrefix = options.routePrefix ?? "";
    driver.currentUserChecker = options.currentUserChecker;
    driver.authorizationChecker = options.authorizationChecker;
    driver.cors = options.cors;

    // next create a controller executor
    new RoutingControllers(driver, options)
        .initialize()
        .registerInterceptors(interceptorClasses)
        .registerMiddlewares("before", middlewareClasses)
        .registerControllers(controllerClasses)
        .registerMiddlewares("after", middlewareClasses); // todo: register only for loaded controllers?
}

/**
 * Registers custom parameter decorator used in the controller actions.
 */
export function createParamDecorator(options: CustomParameterDecorator) {
    return function (object: Object, method: string, index: number) {
        getMetadataArgsStorage().params.push({
            type: "custom-converter",
            object: object,
            method: method,
            index: index,
            parse: false,
            required: options.required,
            transform: options.value
        });
    };
}
