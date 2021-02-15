import { Controller, Inject } from '@nestjs/common';
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class ReplyController {
    @MessagePattern('valida_algo')
    validaAlgo(@Payload() message) {
        console.log(message.value);
        return {
            reply:"reply"
        }
    }
}
