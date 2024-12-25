import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class ResponseWrapperInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // Получаем метаданные роли для текущего запроса
    const roles = this.reflector.get<string[]>(ROLES_KEY, context.getHandler());

    return next.handle().pipe(
      map((data) => ({
        data,
        role: roles?.[roles?.length - 1] || null, // Если роли нет, то null
      })),
    );
  }
}
