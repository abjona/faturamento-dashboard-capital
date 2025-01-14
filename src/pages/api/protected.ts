import { parse } from "cookie";
import { decodeFirebaseToken } from "firebase-edge-auth";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const cookies = parse(req.headers.cookie || "");

  if (!cookies.userToken) {
    return res.status(401).json({ message: "Não autorizado" });
  }
  return res.status(200).json({ message: "Acesso permitido", token: cookies.userToken });
}