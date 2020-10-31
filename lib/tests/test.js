import { describe, it, before } from "mocha";
import "chai/register-should";

import { mikroConsumer, mikroProducer } from "../index";
import type { KafkaConfig } from "../kafka.config";

describe("mikro-kafka-consumer", () => {
  it("should consume a string message", () => {
    const kafkaConfig: KafkaConfig = {
      hostname: "",
      groupId: "",
      topic: "",
      username: "",
      password: "",
    };

    const smsModel = {
      message: "",
      phoneNumber: "",
      sender: "",
    };

    mikroProducer(kafkaConfig, JSON.stringify(smsModel), function (err, succ) {
      console.log(succ);
    });
  });
});
