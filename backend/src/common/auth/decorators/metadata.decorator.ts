import { applyDecorators, SetMetadata } from '@nestjs/common';

export function SetModule(value: string) {
  return applyDecorators(SetMetadata('module', value));
}
