import { UploadOptions } from "../../decorator-options/UploadOptions";
import { getMetadataArgsStorage } from "../../index";
import { SParameterDecorator } from "../../util/decoratorHelpers";

/**
 * Injects an uploaded file object to the controller action parameter.
 * Must be applied on a controller action parameter.
 */
export function UploadedFile(name: string, options?: UploadOptions): SParameterDecorator {
    return (object: Object, methodName: string, index: number) => {
        getMetadataArgsStorage().params.push({
            type: "file",
            object: object,
            method: methodName,
            index: index,
            name: name,
            parse: false,
            required: options?.required,
            extraOptions: options?.options
        });
    };
}
