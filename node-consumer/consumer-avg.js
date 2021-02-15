const Kafka = require('no-kafka');

// Create an instance of the Kafka consumer
var valueSum = 0;
var count = 1

const consumer = new Kafka.SimpleConsumer({"connectionString":"apache-zookeeper_kafka_1:9092"})
var data = function (messageSet) {
    messageSet.forEach(function (m) {
        var value = parseInt(m.message.value.toString('utf8'));
        valueSum = valueSum + value;
        console.log(">>> AVERAGE: ", valueSum/count);
        count = count + 1;
    });
};

// Subscribe to the Kafka topic
return consumer.init().then(function () {
    return consumer.subscribe('my-first-topic', data);
});