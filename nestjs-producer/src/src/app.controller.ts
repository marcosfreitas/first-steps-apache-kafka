import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import { Client, ClientKafka, MessagePattern, Payload, Transport } from "@nestjs/microservices";
import { Producer } from '@nestjs/microservices/external/kafka.interface';
import { AppService } from './app.service';

@Controller()
export class AppController implements OnModuleInit {

  private kafkaProducer: Producer;

  constructor(
      private readonly appService: AppService,
      @Inject("KAFKA_SERVICE")
      private clientKafka: ClientKafka,
    ) {
        console.log("client kafka injected");
    }

    async onModuleInit() {
        // Need to subscribe to topic
        // so that we can get the response from kafka microservice
        //this.clientKafka.subscribeToResponseOf('horses');
        this.kafkaProducer = await this.clientKafka.connect();
    }

  @Get()
  async goHorse() {

        const result = await this.kafkaProducer.send({
          topic:"horses",
          messages: [
              {
                  key: Math.random()+"",
                  value: JSON.stringify(
                    { fruits: ["apple","banana","pineapple"] }
                  )
              }
          ]
      });

      console.log('result', result);
  }
}
