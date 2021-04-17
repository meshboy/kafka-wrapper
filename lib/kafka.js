import type { KafkaConfig } from "./kafka.config";
import { Kafka, logLevel } from "kafkajs";

export const KafkaInstance = (config: KafkaConfig) => {
  const kafka = new Kafka({
    clientId: "mikro-kafka-wrapper",
    brokers: [config.hostname],
    ssl: true,
    sasl: {
      username: config.username,
      password: config.password,
      mechanism: "plain",
    },
    // logLevel: logLevel.ERROR,
  });
  // kafka.logger().setLogLevel(logLevel.WARN);
  return kafka;
};
