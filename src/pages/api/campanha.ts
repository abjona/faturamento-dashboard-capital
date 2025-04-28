import { NextApiRequest, NextApiResponse } from "next";
import { get, ref, set } from "firebase/database";
import { database } from "@/configs/firebase/firebase.config";
import { randomUUID } from "crypto";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method == "POST") {
    const idCampanha = randomUUID().toString();
    const collection = ref(
      database,
      "app_capital_dashboard/campanhas/" + idCampanha,
    );
    await set(collection, JSON.parse(req.body));
    res.status(201).send({ id: idCampanha });
  }

  if (req.method === "GET") {
    var query = req.query?.id;

    if (query) {
      const collection = ref(
        database,
        "app_capital_dashboard/campanhas/" + query,
      );
      const sorteios = await get(collection);
      res.status(200).send(sorteios.val());
    } else {
      const collection = ref(database, "app_capital_dashboard/campanhas");
      const sorteios = await get(collection);
      res.status(200).send(sorteios.val());
    }
  }
}
