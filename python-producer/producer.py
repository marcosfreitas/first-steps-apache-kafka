from kafka import KafkaProducer
import json
import random
from time import sleep
from datetime import datetime

# Create an instance of the Kafka producer
producer = KafkaProducer(
    bootstrap_servers='host.docker.internal:9094',
    #api_version=(2,6,0),
    value_serializer=lambda v: str(v).encode('utf-8')
)

# Call the producer.send method with a producer-record
count = 0;
while (count<2):
    num = random.randint(1,999)
    producer.send('my-first-topic', num)
    print('sent num ', num)
    producer.flush()
    count = count+1


print("Good bye")