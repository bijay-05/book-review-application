import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MetricsService } from 'src/common/metrics/metrics.service';

@Injectable()
export class RequestDefaultInterceptor<T>
  implements NestInterceptor<Promise<T>>
{
  constructor(
    private readonly reflector: Reflector, 
    private readonly metricsService: MetricsService
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<Promise<any>>> {

    return next.handle().pipe(
      tap(() => {
        const request: Request = context.switchToHttp().getRequest();

        // increase the request counter excluding requests to /metrics endpoint by prometheus
        if (request.path !== '/metrics') { 
          this.metricsService.incrementHandledRequestCounter({ method: request.method, route: request.path });
          this.metricsService.addToRequestLatencyHist({ latency: 0.025, method: request.method,route: request.path });
        }
      })
    );
  }
}
