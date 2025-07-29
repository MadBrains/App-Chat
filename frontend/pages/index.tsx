import * as React from 'react';
import type { GetServerSideProps, NextPage } from 'next';

const Home: NextPage = () => {
  return <div>NextPage</div>;
};
export const getServerSideProps: GetServerSideProps = async context => {
  const basePath = '/chat';

  return {
    redirect: {
      destination: basePath,
      permanent: true
    }
  };
};

export default Home;