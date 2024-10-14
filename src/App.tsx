import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./components/table";

import useArticlesQuery from "./hooks/useArticlesQuery.ts";
import { useState } from "react";
import { debounce } from "./utils/debounce.ts";

function App() {
  const [limit, setLimit] = useState<number>(10);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [ordering, setOrdering] = useState<string>("");
  const [isFeatured, setIsFeatured] = useState<boolean>(false);
  const { articles, loading, error, total } = useArticlesQuery({
    query: {
      limit,
      offset: limit * (pageNumber - 1),
      search,
      ordering,
      is_featured: isFeatured,
    },
  });
  return (
    <div>
      <div className="max-w-5xl mx-auto px-2">
        <div className="py-4 flex gap-4">
          <input
            type="search"
            onChange={(e) => debounce(() => setSearch(e.target.value), 500)()}
            className="border outline-none focus:ring-2 focus:ring-offset-2 rounded focus:ring-blue-500 px-2 py-1 bg-gray-50"
            placeholder="Search articles"
          />
          <div>
            <input
              type="checkbox"
              id="featured"
              name="featured"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
            />
            <label className="ml-2" htmlFor="featured">
              Featured
            </label>
          </div>
        </div>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Title</TableHeader>
              <TableHeader>Summary</TableHeader>
              <TableHeader>News site</TableHeader>
              <TableHeader
                sortBy="published_at"
                order={ordering}
                setOrder={setOrdering}
              >
                Published at
              </TableHeader>
              <TableHeader
                sortBy="updated_at"
                order={ordering}
                setOrder={setOrdering}
              >
                Updated at
              </TableHeader>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading && (
              <TableRow>
                <TableCell>Loading...</TableCell>
              </TableRow>
            )}
            {error && (
              <TableRow>
                <TableCell>Error: {error.message}</TableCell>
              </TableRow>
            )}
            {!loading && articles?.length === 0 && (
              <TableRow>
                <TableCell>No articles found</TableCell>
              </TableRow>
            )}
            {!loading && !error && (
              <>
                {articles?.map((article) => (
                  <TableRow key={article.id}>
                    <TableCell>{article.title}</TableCell>
                    <TableCell>{article.summary}</TableCell>
                    <TableCell>{article.news_site}</TableCell>
                    <TableCell>
                      {new Date(article.published_at).toUTCString()}
                    </TableCell>
                    <TableCell>
                      {new Date(article.updated_at).toUTCString()}
                    </TableCell>
                  </TableRow>
                ))}
              </>
            )}
          </TableBody>
        </Table>
        <div>
          <p className="py-2 text-center">
            Showing{" "}
            <input
              type="number"
              className="border outline-none focus:ring-2 focus:ring-offset-2 rounded focus:ring-blue-500 w-12 px-1 py-1 bg-gray-50"
              value={limit}
              onChange={(e) => setLimit(parseInt(e.target.value))}
            />{" "}
            of {total} articles
          </p>
        </div>

        <div className="py-4 flex justify-center gap-3">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => setPageNumber((prev) => prev - 1)}
          >
            Previous
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => setPageNumber((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
