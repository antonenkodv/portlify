import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
    Logger,
    NotFoundException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import {ValidationException} from "../pipes/custom.validation.pipe";

@Catch()
export class MyExceptionFilter implements ExceptionFilter {

    private logger = new Logger('MyExceptionFilter');

    constructor() {
    }

    catch(exception: Error, host: ArgumentsHost) {
        this.logger.error(exception);
        const ctx = host.switchToHttp();
        const request = ctx.getRequest<Request>();
        const response = ctx.getResponse<Response>();
        let status = this.responseStatus(exception);

        const responseData: any = {
            code: status,
            timestamp: new Date().toISOString(),
            path: request.url,
        };

        if (exception instanceof ValidationException) {
            responseData.errors = exception.getResponse();
        } else if (exception instanceof NotFoundException) {
            responseData.message = "The requested resource could not be found";
        } else {
            responseData.message = exception.message;
        }

        response.status(status).json(responseData);
    }

    private responseStatus(exception: Error): number {
        if (exception instanceof HttpException) {
            return exception.getStatus();
        } else {
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }
    }
}
