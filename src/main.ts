import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { helmetConfig } from './config/helmet/helmet.config';
import { validationConfig } from './config/validation/validation.config';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);

  helmetConfig(app);
  validationConfig(app);

  app.enableCors();

  await app.listen(process.env.PORT || 3000);
};
bootstrap();
