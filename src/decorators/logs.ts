import { applyDecorators, SetMetadata } from '@nestjs/common';
import { LOG_KEY, LOG_MESSAGE } from '../constants/logs';
import { getStackTrace } from '../utils';

export function NestLogger(): Function {
  const message = getStackTrace();
  return applyDecorators(
    SetMetadata(LOG_KEY, true),
    SetMetadata(LOG_MESSAGE, message),
  );
}

