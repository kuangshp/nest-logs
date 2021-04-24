import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { LOG_MESSAGE, LOG_KEY } from '../constants/logs';
import { Logger } from '../utils';

@Injectable()
export class LogsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request: Request = context.switchToHttp().getRequest();
    const isPrintLog = Reflect.getMetadata(LOG_KEY, context.getHandler()) || Reflect.getMetadata(LOG_KEY, context.getClass());
    const fileName = Reflect.getMetadata(LOG_MESSAGE, context.getHandler()) || Reflect.getMetadata(LOG_MESSAGE, context.getClass());
    if (isPrintLog) {
      const logStr = `
  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  当前类名: ${context.getClass()['name']}
  当前方法名: ${context.getHandler()['name']}
  当前请求: ${request.method} - ${request.url}
  IP: ${request.ip}
  当前Params参数: ${JSON.stringify(request.params, null, 2)}
  当前Query参数: ${JSON.stringify(request.query, null, 2)}
  当前请求体: ${JSON.stringify(request.body, null, 2)}
  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\n`;
      Logger.access(fileName, logStr);
    }
    return next.handle();
  }
}
