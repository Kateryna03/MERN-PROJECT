//хук для взаимодействия с сервером

import { useCallback, useState } from "react";

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setLoading(true);
      try {
        if (body) {
          body = JSON.stringify(body);
          headers["Content-Type"] = "application/json";
          console.log("Body", body);
        }
        const response = await fetch(url, { method, body, headers });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Something went wrong...");
        }

        setLoading(false);
        return data;
      } catch (error) {
        setLoading(false);
        setError(error.message);
        throw error;
        //console.log(error.message);
      }
    },
    []
  );
  const clearError = useCallback(() => setError(null), []);

  //const clearError = () => setError(null); - так не работает
  return { loading, request, error, clearError };
};
