import * as _ from 'lodash';
import {Logger} from '@nestjs/common';
import {type} from 'os';

const logger = new Logger('logPerformance');

export function logPerformance(extras?: ExtrasType) {
    return (target: any, methodName: string, descriptor: PropertyDescriptor) => {
        const {name: className} = target.constructor;
        const name = `${className}/${methodName}`;

        const method = descriptor.value;

        descriptor.value = function(...parameters: any[]) {
            const startTime = Date.now();

            try {
                const appliedMethodResult = method.apply(this, parameters);

                const isPromise = appliedMethodResult instanceof Promise;

                if (!isPromise) {
                    const took = Date.now() - startTime;
                    logExecution.bind(this)(name, took, parameters, appliedMethodResult, extras, null);
                    return appliedMethodResult;
                }

                return appliedMethodResult
                    .then((result: any) => {
                        const took = Date.now() - startTime;
                        logExecution.bind(this)(name, took, parameters, result, extras, null);
                        return result;
                    })
                    .catch((e: Error) => {
                        const took = Date.now() - startTime;
                        logExecution.bind(this)(name, took, parameters, null, extras, e);
                        throw e;
                    });
            } catch (e) {
                const took = Date.now() - startTime;
                logExecution.bind(this)(name, took, parameters, null, extras, e);
                throw e;
            }
        };

        return descriptor;
    };
}

function logExecution(name: string, took: number, args: any[], result: any, extrasOption: ExtrasType, error?: Error): void {
    let log = `${name} took ${took}ms`;

    if (typeof extrasOption === 'function' && _.isNil(error)) {
        log += ` | extras: ${extrasOption(this, args, result)}`;
    } else if (typeof extrasOption === 'string' || Array.isArray(extrasOption)) {
        const extras = [];
        _.castArray(extrasOption);
        log += ` | extras: ${extras.join(',')}`;
    }

    if (!_.isNil(error)) {
        log += ` | error: ${error.message}`;
        return logger.error(log);
    }

    logger.log(log);

}

export type ExtrasType = string | string[] | ExtrasFunction;
export type ExtrasFunction = (instance, args: any[], result: any) => string;
