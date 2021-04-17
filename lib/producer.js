import type { KafkaConfig } from "./kafka.config";
import logger from "./logger";
import { KafkaInstance } from "./kafka";
import { CompressionTypes, logLevel } from "kafkajs";

export const mikroProducer = async (
  kafkaConfig: KafkaConfig,
  message: any,
  key: any
) => {
  const kafkaInstance = KafkaInstance(kafkaConfig);
  const producer = kafkaInstance.producer({ allowAutoTopicCreation: true });
  producer.logger().setLogLevel(logLevel.DEBUG);

  await producer.connect();

  return new Promise(async (resolve) => {
    const responses = await producer.send({
      topic: kafkaConfig.topic,
      compression: CompressionTypes.GZIP,
      messages: [
        {
          key: key,
          value: JSON.stringify(message),
        },
      ],
    });

    logger.info("::: Kafka message published :::");
    resolve(responses);
  });
};
