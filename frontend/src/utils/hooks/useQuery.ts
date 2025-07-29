import { useRouter } from 'next/router';

export const useQuery = <T extends string>(params: readonly T[]) => {
  const router = useRouter();

  return params.reduce((acc, queryString) => {
    const routerQuery = router.query?.[queryString];

    acc[queryString] = typeof routerQuery === 'string' ? routerQuery : '';

    return acc;
  }, {} as Record<T, string>);
};
