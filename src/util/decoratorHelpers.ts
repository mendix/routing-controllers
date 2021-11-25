export type SParameterDecorator = (target: Object, propertyKey: string, parameterIndex: number) => void;

export type SMethodDecorator = <T>(target: Object, propertyKey: string) => void | TypedPropertyDescriptor<T>;
