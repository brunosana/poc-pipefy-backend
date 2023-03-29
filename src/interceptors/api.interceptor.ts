import {
  CallHandler,
  ConsoleLogger,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable()
export class ApiInterceptor implements NestInterceptor {
  constructor(private readonly logger: ConsoleLogger) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    this.logger.setContext('ApiInterceptor');
    const request = context.switchToHttp().getRequest<Request>();

    this.logger.log(
      `request: ${request.url} | body: ${JSON.stringify(request.body)}`,
    );

    const now = Date.now();
    return next.handle().pipe(
      tap(() => this.logger.log(`finished in ${Date.now() - now}ms`)),
      catchError((err) =>
        throwError(() => {
          this.logger.error(
            `error: ${err?.message || err} | finished in ${Date.now() - now}ms`,
          );
          return err;
        }),
      ),
    );
  }
}
