import React, { PropsWithChildren } from 'react';
import styled from '@emotion/styled';
import { Typography } from 'src/ui/Typography/Typography';

const PageWrapper = styled.section({
  display: 'flex',
  flexDirection: 'column',
  padding: '40px 50px'
});

interface PageProps {
  title?: string;
}

const Page: React.FC<PropsWithChildren<PageProps>> = ({ children, title }) => {
  return (
    <PageWrapper>
      {title && (
        <Typography variant='h1' component='h1'>
          {title}
        </Typography>
      )}
      {children}
    </PageWrapper>
  );
};

export default Page;
