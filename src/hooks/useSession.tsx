import { decodeFirebaseToken } from "firebase-edge-auth";
import { useState, useEffect } from "react";

export const useSession = () => {
  const [user, setUser] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch("/api/protected", { method: "GET" });
        const json: any = await response.json();
        const decodedToken = await decodeFirebaseToken(json.token, "app-capital-premios");
        
        setUser(decodedToken); // Você pode buscar mais detalhes do usuário
      } catch {
        setUser({});
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  return { user, loading };
};