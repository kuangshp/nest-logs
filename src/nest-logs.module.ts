import { Module, Global } from '@nestjs/common';
import { LogsInterceptor } from './interceptor/logs.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Global()
@Module({
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LogsInterceptor,
    },
  ],
})
export class NestLogsModule {}
