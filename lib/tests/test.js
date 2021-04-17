import { describe, it, before } from "mocha";
import "chai/register-should";

import { mikroConsumer, mikroProducer } from "../index";
import type { KafkaConfig } from "../kafka.config";

describe("mikro-kafka-consumer", () => {
  const kafkaConfig: KafkaConfig = {
    topic: "",
    hostname: "",
    username: "",
    groupId: "",
    password: "",
  };
  it("should consume", () => {
    mikroConsumer(kafkaConfig).then((response) => {
      console.log(response);
    });
  });

  it("should produce", () => {
    mikroProducer(kafkaConfig, JSON.stringify({ key: "hello world" })).then((response) => {
      console.log(response);
    });
  });
});
