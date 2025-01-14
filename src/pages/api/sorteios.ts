import { NextApiRequest, NextApiResponse } from "next";
import { get, ref, set } from "firebase/database";
import { database } from "@/configs/firebase/firebase.config";
import { randomUUID } from "crypto";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    const collection = ref(database, "app_capital_dashboard/sorteio-" + randomUUID().toString());
    await set(collection, req.body);
  }

  if (req.method === "GET"){
    const collection = ref(database, "app_capital_dashboard/sorteios");
    const sorteios = await get(collection);
    res.status(200).send(sorteios.val());
  }
}
