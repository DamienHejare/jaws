import type { NextApiRequest, NextApiResponse } from "next";
import { ResponseDataType } from "../../../../db/ResponseDataMeta";
import { deleteOrder } from "../../../../services/alpacaService";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { query, method } = req;
  const { id } = query;

  try {
    const responseData: ResponseDataType = { status: "INIT" };

    switch (method) {
      case "DELETE":
        if (id && !(id instanceof Array)) {
          await deleteOrder(id)
            .then(() => {
              responseData.status = "OK";
            })
            .catch((e) => {
              responseData.status = "NOK";
              responseData.message = e.message;
            });
        }
        break;
      default:
        throw new Error(`Unsupported method: ${method as string}`);
    }
    res.status(200).json(responseData);
  } catch (e) {
    let message;
    if (e instanceof Error) {
      message = e.message;
      if (typeof e.message !== "string") {
        message = e;
      }
    }
    console.error(message);
    return res.status(500).json({
      error: message,
    });
  }
}
