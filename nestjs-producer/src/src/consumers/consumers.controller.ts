import { Controller, Inject, OnModuleInit } from '@nestjs/common';
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class ConsumersController implements OnModuleInit {
    constructor(
        @Inject("KAFKA_SERVICE")
        private clientKafka: ClientKafka,
    ) {
        console.log("client kafka injected");
    }

    async onModuleInit() {
        // Need to subscribe to topic
        // so that we can get the response from kafka microservice
        this.clientKafka.subscribeToResponseOf('valida_algo');
    }

    @MessagePattern("horses")
    consumerHorse(@Payload() message){
        console.log('consumer',message.value);
        return {
            status: "ok"
        }
    }

    @MessagePattern('horses')
    reply(@Payload() message) {
        console.log('reply', message);
        // observalbe -> promise
        this.clientKafka.send('valida_algo', {status:"ok"}).subscribe(reply => console.log(reply));
    }
}
