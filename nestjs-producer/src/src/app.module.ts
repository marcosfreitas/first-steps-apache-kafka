import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConsumersController } from './consumers/consumers.controller';
import { ReplyController } from './reply/reply.controller';

@Module({
  imports: [
      // for producer
      ClientsModule.register([
        {
            name: "KAFKA_SERVICE",
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
        }
      ])
  ],
  controllers: [AppController, ConsumersController, ReplyController],
  providers: [AppService],
})
export class AppModule {}
