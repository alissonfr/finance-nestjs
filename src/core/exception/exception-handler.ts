import { Catch, ExceptionFilter, ArgumentsHost, HttpException } from '@nestjs/common';
import e, { Response } from 'express';
import { HttpStatus } from '@nestjs/common';

export enum SqlErrorEnum {
    UNIQUE_VIOLATION = '23505'
}

@Catch()
export class ExceptionHandler implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();

    if (exception.code === SqlErrorEnum.UNIQUE_VIOLATION) {
      return this.handleUniqueViolation(exception, response, request);
    }

    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const message = this.getErrorMessage(exception);

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    });
  }

  private handleUniqueViolation(exception, response: Response, request) {
    const EXTRACT_KEY_VALUE_FROM_ERROR_MESSAGE = /Key \(([^)]+)\)=\(([^)]+)\)/;
    const match = exception.detail.match(EXTRACT_KEY_VALUE_FROM_ERROR_MESSAGE);
    return response.status(HttpStatus.BAD_REQUEST).json({
      statusCode: HttpStatus.BAD_REQUEST,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: `${match[1].charAt(0) + match[1].slice(1)} já está em uso.`
    });
  }

  private getErrorMessage(exception: any) {
    if (exception instanceof HttpException) {
      return exception.getResponse();
    }

    console.error(exception);
    return 'Erro no servidor.';
  }
}