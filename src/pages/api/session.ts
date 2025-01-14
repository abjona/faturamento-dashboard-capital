import { serialize } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { token } = JSON.parse(req.body);

    if (!token) {
      res.status(400).json({ message: "Token é necessário" });
    }

    // Configurar o cookie com o token
    res.setHeader(
      "Set-Cookie",
      serialize("userToken", token, {
        httpOnly: true, // Somente acessível pelo servidor
        secure: process.env.NODE_ENV === "production", // Apenas HTTPS em produção
        maxAge: 60 * 60 * 24 * 1, // 1 dia
        path: "/", // Disponível para todo o site
      }),
    );

    res.status(200).json({ message: "Sessão criada com sucesso" });
  }

  if (req.method === "DELETE") {
    res.setHeader(
      "Set-Cookie",
      serialize("userToken", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: -1, // Expira o cookie
        path: "/",
      }),
    );

    res.status(200).json({ message: "Sessão encerrada com sucesso" });
  }
}
