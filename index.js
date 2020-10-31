const mikroKafka = require("./dist");

module.exports = {
  // eslint-disable-next-line global-require
  mikroConsumer: mikroKafka.mikroConsumer,
  // eslint-disable-next-line global-require
  mikroProducer: mikroKafka.mikroProducer,

  kafkaConfig: mikroKafka.KafkaConfig,
};
