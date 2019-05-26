import { Catch, HttpException, ExceptionFilter, ArgumentsHost } from '@nestjs/common';

/* https://docs.nestjs.com/exception-filters */

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {

    catch (exception: any, host: ArgumentsHost) {
        const context = host.switchToHttp();
        const response = context.getResponse();
        const request = context.getRequest();
        const status = exception.getStatus();
        const message = exception.message;

        response
            .status(status)
            .json({
                statusCode: status,
                timestamp: new Date().toISOString(),
                method: request.method,
                path: request.url,
                message: message.message || exception.error,
            });
    }

}
