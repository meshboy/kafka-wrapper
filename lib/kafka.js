import type { KafkaConfig } from './kafka.config';
import { Kafka, logLevel } from 'kafkajs';

export const KafkaInstance = (config: KafkaConfig) => {
  // kafka.logger().setLogLevel(logLevel.WARN);
  return new Kafka({
    clientId: "mikro-kafka-wrapper",
    brokers: [config.hostname],
    ssl: true,
    authenticationTimeout: 5000,
    sasl: {
      username: config.username,
      password: config.password,
      mechanism: "plain",
    },
    logLevel: logLevel.ERROR,
  });
};
