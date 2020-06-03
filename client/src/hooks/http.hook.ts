import { useState, useCallback } from "react";

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(
    async (
      url: string,
      method: string = "GET",
      body: string | null = null,
      headers: string[][] = []
    ) => {
      setLoading(true);

      if (body) {
        headers.push(["Content-Type", "application/json"]);
      }

      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Something wrong");
        }

        setLoading(false);

        return data;
      } catch (e) {
        setLoading(false);
        setError(e.message);

        throw e;
      }
    },
    []
  );

  const clearError = useCallback(() => setError(null), []);

  return { loading, request, error, clearError };
};
