import { NextApiRequest, NextApiResponse } from "next";
import { get, ref, set } from "firebase/database";
import { database } from "@/configs/firebase/firebase.config";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  if (req.method === "GET"){
    if (req.query.id == "0"){
      const collection = ref(database, "app_capital");
      const vendas = await get(collection);
      res.status(200).send(vendas.val());
    } else {
      const collection = ref(database, "app_capital_ranges/"+req.query.id+"/vendidos");
    const vendas = await get(collection);
    res.status(200).send(vendas.val());
    }
  }
}
