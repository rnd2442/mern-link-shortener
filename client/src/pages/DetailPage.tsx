import React, { useState, useCallback, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";
import { Loader } from "../components/Loader";
import { LinkCard } from "../components/LinkCard";
import { TLink } from "../types";

type RouteParams = {
  id: string;
};

export const DetailPage: React.FC = () => {
  const { token } = useContext(AuthContext);

  const { request, loading } = useHttp();
  const [link, setLink] = useState<TLink | null>(null);

  // This ID taken from routes in App.tsx
  const linkId = useParams<RouteParams>().id;

  const getLink = useCallback(async () => {
    try {
      const newLink = await request(`/api/link/${linkId}`, "GET", null, [
        ["Authorization", `Bearer ${token}`],
      ]);

      setLink(newLink);
    } catch (e) {}
  }, [token, linkId, request]);

  useEffect(() => {
    getLink();
  }, [getLink]);

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="section">
      {!loading && link && <LinkCard link={link!} />}
    </section>
  );
};
