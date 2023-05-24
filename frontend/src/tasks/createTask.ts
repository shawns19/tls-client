import { v4 as uuidv4 } from "uuid";
export const createRequestTask = (url: string) => {
  return {
    ID: uuidv4(),
    Payload: url,
    Method: "sendRequest",
    Status: "IDLE",
  };
};
