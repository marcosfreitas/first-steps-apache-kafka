import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // for consumers
  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'kafkaSample',
        brokers: ['host.docker.internal:9094'],
      },
      consumer: {
        groupId: 'my-kafka-consumer' + Math.random() // Should be the same thing we give in consumer
      }
    }
  });

  await app.startAllMicroservicesAsync();
  await app.listen(3000);
}
bootstrap();
