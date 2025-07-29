import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
  getMetaData?: (page: ReactElement) => ReactNode;
};

export type PickEnum<T, K extends T> = {
  [P in keyof K]: P extends K ? P : never;
};
