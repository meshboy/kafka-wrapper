import type { KafkaConfig } from "./kafka.config";
import logger from "./logger";
import { KafkaInstance } from "./kafka";
import { logLevel } from "kafkajs";

export const mikroConsumer = async (kafkaConfig: KafkaConfig, callback) => {
  const kafkaInstance = KafkaInstance(kafkaConfig);
  const consumer = kafkaInstance.consumer({
    groupId: kafkaConfig.groupId,
    allowAutoTopicCreation: true,
  });
  // consumer.logger().setLogLevel(logLevel.DEBUG);

  await consumer.connect();
  await consumer.subscribe({
    topic: kafkaConfig.topic,
    fromBeginning: kafkaConfig.fromBeginning || false,
  });

  await consumer.run({
    autoCommit: true,
    partitionsConsumedConcurrently: 6,
    eachMessage: async ({ topic, partition, message }) => {
      const messageString = message.value.toString();
      logger.info(`Kafka consumed with properties
      topic : [${topic}]
      key: [${message.key ? message.key.toString() : null}]
      partition : [${partition}]
      message : [${messageString}]`);
      try {
        callback(JSON.parse(messageString));
      } catch (e) {
        callback(messageString);
      }
    },
  });
};
