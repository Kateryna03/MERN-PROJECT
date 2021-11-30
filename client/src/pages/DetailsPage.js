import React, { useCallback, useContext, useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router";
import { Loader } from "../components/Loader";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/httpHook";
import { LinkCard } from "../components/LinkCard";

export const DetailsPage = () => {
  const { token } = useContext(AuthContext);
  const { request, loading } = useHttp();
  const [link, setLink] = useState(null); //получаем с бэка
  const linkId = useParams().id;

  //метод для звгрузки ссылки
  const getLink = useCallback(async () => {
    try {
      const fetched = await request(`/api/links/${linkId}`, "GET", null, {
        Authorization: `Bearer ${token}`,
      }); //получаю ссылку
      setLink(fetched);
    } catch (e) {}
  }, [token, request, linkId]);

  useEffect(() => {
    getLink();
  }, [getLink]);

  if (loading) {
    return <Loader />; //тк нужно время пока загрузится с сервера
  }
  return <>{!loading && link && <LinkCard link={link} />}</>;
};
