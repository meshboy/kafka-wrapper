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
    password:""
  };

  // it("should consume", () => {
  //   kafkaConfig.groupId = "3456"
  //   mikroConsumer(kafkaConfig).then((response) => {
  //     console.log(response);
  //   });
  // });

  it("should produce", () => {
    mikroProducer(
      kafkaConfig,
      {
        message:
          "U=se 851757 as your One Time Password. Expires at 29/04/2021 12:20:46 AM. " +
          "Kindly contact us if you have any issue.\nHXAUcB6z8FI",
        phoneNumber: "+234 813 706 5162",
        sender: "Mikro",
        type: "SMS",
      },
      (response) => {
        console.log(response);
      }
    );
  });
});
