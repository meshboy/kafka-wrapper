import type { KafkaConfig } from "./kafka.config";
import logger from "./logger";

const kafka = require("kafka-node");
const { HighLevelProducer, KafkaClientOptions, OffsetFetchRequest } = kafka;

export const mikroProducer = async (
  kafkaConfig: KafkaConfig,
  message: any,
  callback
) => {
  const clientOptions: KafkaClientOptions = {
    kafkaHost: kafkaConfig.hostname,
    sasl: {
      mechanism: "plain",
      username: kafkaConfig.username,
      password: kafkaConfig.password,
    },
  };

  const client = new kafka.KafkaClient(clientOptions);

  const producer = new HighLevelProducer(client);

  const payload: OffsetFetchRequest[] = [
    {
      topic: kafkaConfig.topic,
      messages: message,
    },
  ];

  producer.on("ready", async function () {
    producer.send(payload, (err, data) => {
      if (err) {
        logger.error(`kafka producer failed with error ${JSON.stringify(err)}`);
        callback(err, null)
      } else {
        logger.info(`kafka producer published message`);
        callback(null, data)
      }
    });
  });
};
