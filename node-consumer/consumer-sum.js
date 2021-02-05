const Kafka = require('no-kafka');

var valueSum = 0;

// Create an instance of the Kafka consumer
const consumer = new Kafka.SimpleConsumer({"connectionString":"apache-zookeeper_kafka_1:9092"})
var data = function (messageSet) {
    messageSet.forEach(function (m) {

        if (typeof m.message.value !== 'object') {
            var value = parseInt(m.message.value.toString('utf8'));
            valueSum = valueSum + value;
            console.log("@@@ SUM: ",valueSum);
            return
        }

        console.log("@@@ OBJECT", m.message.value.toString())
    });
};

// Subscribe to the Kafka topic
return consumer.init().then(function () {
    return consumer.subscribe('my-first-topic', data);
});