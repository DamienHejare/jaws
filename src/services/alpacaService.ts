import fetch, { BodyInit } from "node-fetch";
import { convertResult, handleResult } from "../util";
import { handleLimitPrice } from "../util/handleLimitPrice";
import { handleCalculateQuantity } from "../util/handleQuantity";

const {
  ALPACA_API_KEY_ID = "[NOT_DEFINED_IN_ENV]",
  ALPACA_API_KEY_VALUE = "[NOT_DEFINED_IN_ENV]",
} = process.env;

const buff = Buffer.from(
  `${ALPACA_API_KEY_ID}:${ALPACA_API_KEY_VALUE}`,
  "utf-8",
);
const base64EncodedKeys = buff.toString("base64");

const accountId = "b75acdbc-3fb6-3fb3-b253-b0bf7d86b8bb"; // public info
const brokerApiBaseUrl = "https://broker-api.sandbox.alpaca.markets/v1";

export const postOrder = async (
  ticker: string,
  orderType: string,
  price: number,
  quantity: number,
) => {
  const body: BodyInit = JSON.stringify({
    symbol: ticker,
    qty: quantity,
    side: orderType,
    time_in_force: "day",
    type: "limit",
    limit_price: price,
  });

  // TODO: REMOVE ME WHEN WE FEEL SAFE!!!!
  console.log("Body to be sent to Alpaca:", body);
  throw Error(`TEMPORARY EXITING POST ORDER TO ALPACA!!!`);

  try {
    const res = await fetch(
      `${brokerApiBaseUrl}/trading/accounts/${accountId}/orders`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${base64EncodedKeys}`,
        },
        body,
      },
    );
    return await handleResult(res);
  } catch (e) {
    console.log(e);
    throw Error(`Unable to post order - ${e as string}`);
  }
};

export const getOrders = async () => {
  try {
    const res = await fetch(
      `${brokerApiBaseUrl}/trading/accounts/${accountId}/orders?status=all`,
      {
        headers: {
          Authorization: `Basic ${base64EncodedKeys}`,
        },
      },
    );
    return await handleResult(res);
  } catch (e) {
    throw Error(`Unable to get orders - ${e as string}`);
  }
};

export const deleteOrder = async (orderId: string) => {
  try {
    const res = await fetch(
      `${brokerApiBaseUrl}/trading/accounts/${accountId}/orders/${orderId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Basic ${base64EncodedKeys}`,
        },
      },
    );
    return await handleResult(res);
  } catch (e) {
    console.log(e);
    throw Error(`Unable to delete order`);
  }
};

export const getAccountCashBalance = async () => {
  const res = await fetch(
    `${brokerApiBaseUrl}/trading/accounts/${accountId}/account`,
    {
      headers: {
        Authorization: `Basic ${base64EncodedKeys}`,
      },
    },
  );
  const result = await convertResult(res);
  return result.cash;
};