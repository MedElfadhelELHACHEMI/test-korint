import { useEffect, useState } from "react";
import { Article, articlesList, ArticlesListData } from "../api";
import { client } from "../client.ts";

export default function useArticlesQuery({ query }: ArticlesListData) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorEvent | null>(null);
  const [articles, setArticles] = useState<Article[]>();
  const [total, setTotal] = useState<number>(0);
  const { limit, offset, search, ordering, is_featured } = query;
  useEffect(() => {
    const fetchArticles = async () => {
      setIsLoading(true);
      try {
        const response = await articlesList({
          client,
          query: { limit, offset, search, ordering, is_featured },
        });
        if (response) {
          setArticles(response?.data?.results);
          setTotal(response?.data?.count || 0);
        }
      } catch (e) {
        setError(e as ErrorEvent);
      }
      setIsLoading(false);
    };
    fetchArticles();
  }, [limit, offset, search, ordering, is_featured]);

  return { articles, loading: isLoading, error, total };
}
