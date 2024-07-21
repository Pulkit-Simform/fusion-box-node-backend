import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { ResponseInterceptor } from './core/interceptors/response.interceptor';
import { INestApplication, Logger } from '@nestjs/common';
import * as compression from 'compression';
import * as morgan from 'morgan';
import { ConfigService } from './config/config.service';

function configureSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Fusion box backend')
    .setDescription('Fusion box backend api')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
}

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);

  configureSwagger(app);
  app.enableCors({ origin: '*' });
  app.use(compression());

  app.use(cookieParser());
  const moduleRef = app.select(AppModule);
  const reflector = moduleRef.get(Reflector);
  app.useGlobalInterceptors(new ResponseInterceptor(reflector));

  const configService = app.get(ConfigService);
  const port = configService.get('servicePort');

  app.use(
    morgan('tiny', {
      skip: (req) => req.url.includes('healthCheck'),
    }),
  );

  await app.listen(port);
  logger.log(`🚀 Fusion backend service is running on port ${port}`);
}
bootstrap();
