import React, { useState, useContext, useCallback, useEffect } from "react";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";
import { Loader } from "../components/Loader";
import { LinkList } from "../components/LinkList";
import { TLink } from "../types";

export const LinksPage: React.FC = () => {
  const { token } = useContext(AuthContext);

  const [links, setLinks] = useState<TLink[]>([]);
  const { request, loading } = useHttp();

  const getLinks = useCallback(async () => {
    try {
      const fetchedLinks = await request(`/api/link/`, "GET", null, [
        ["Authorization", `Bearer ${token}`],
      ]);

      setLinks(fetchedLinks);
    } catch (e) {}
  }, [token, request]);

  useEffect(() => {
    getLinks();
  }, [getLinks]);

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="section">
      {!loading && <LinkList links={links} />}
    </section>
  );
};
