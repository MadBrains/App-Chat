import { useRouter } from 'next/router';
import queryString from 'query-string';
import { useState } from 'react';

interface SearchQueryParams {
  [key: string]: string;
}

export const useQuerySearch = () => {
  const router = useRouter();
  const [query, setQuery] = useState(queryString.parseUrl(router.asPath).query);

  const setSearchQuery = (queryObject: SearchQueryParams) => {
    const currentQuery = queryString.parseUrl(router.asPath).query;
    const changedSearchQuery = queryString.stringify({ ...currentQuery, ...queryObject }, {skipEmptyString: true});
    setQuery(prevQuery => ({
      ...prevQuery,
      ...queryObject
    }));
    return router.push({ query: changedSearchQuery });
  };

  return { setSearchQuery, query };
};
