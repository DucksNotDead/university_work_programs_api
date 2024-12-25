import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ResponseWrapperInterceptor } from '../shared/interseptors/response-wrapper.interseptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3000',  // Замените на ваш домен, который будет иметь доступ
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',  // Разрешенные методы
    allowedHeaders: 'Content-Type, Accept, Authorization',  // Разрешенные заголовки
    credentials: true,  // Разрешение на отправку куков и авторизации
  });

  app.use(cookieParser());

  app.useGlobalInterceptors(new ResponseWrapperInterceptor(app.get(Reflector)));

  await app.listen(process.env.PORT ?? 8080);
}
void bootstrap();
