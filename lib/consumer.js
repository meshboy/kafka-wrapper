import type { KafkaConfig } from "./kafka.config";
import logger from "./logger";
const kafka = require("kafka-node");
const { ConsumerOptions, KafkaClientOptions, OffsetFetchRequest } = kafka;

export const mikroConsumer = (kafkaConfig: KafkaConfig, callback: any) => {
  try {
    const Consumer = kafka.Consumer;

    const clientOptions: KafkaClientOptions = {
      kafkaHost: kafkaConfig.hostname,
      sasl: {
        mechanism: "plain",
        username: kafkaConfig.username,
        password: kafkaConfig.password
      }
    };

    const client = new kafka.KafkaClient(clientOptions);

    const payload: OffsetFetchRequest[] = [
      {
        topic: kafkaConfig.topic
      }
    ];

    const consumerOptions: ConsumerOptions = {
      autoCommit: true,
      groupId: kafkaConfig.groupId,
      fromOffset: false,
      encoding: "utf8",
      fetchMaxBytes: 1024 * 1024,
      fetchMaxWaitMs: 1000
    };

    const consumer = new Consumer(client, payload, consumerOptions);

    consumer.on("message", async function(message: any) {
      logger.info(
        `kafka consumer consumed msg:  ${JSON.stringify(message.value)}`
      );
      try {
        callback(JSON.parse(message.value));
      } catch (e) {
        callback(message);
      }
    });

    consumer.on("error", function(error) {
      logger.error(
        `Kafka consumer failed with error:  ${JSON.stringify(error)}`
      );
      callback(null);
    });
  } catch (e) {
    logger.error(`Kafka consumer failed with error ${JSON.stringify(e)}`);
  }
};
