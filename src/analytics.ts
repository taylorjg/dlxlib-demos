import { AvailableDemo } from "types";

export const sendAnalyticsClickEvent = (
  eventName: string,
  demo: AvailableDemo
) => {
  const command = "event";
  const eventParams = { demo: demo.shortName };
  gtag(command, eventName, eventParams);
};
