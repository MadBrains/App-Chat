import React from 'react';
import { StyledContainer } from 'src/components/NotFound/styled';
import { Typography } from 'src/ui/Typography/Typography';

const NotFound: React.FC = () => {
  return (
    <StyledContainer>
      <Typography variant={'h1'} component={'h1'} sx={{ textAlign: 'center' }}>
        404: <br />
        страница не <br />
        найдена
      </Typography>
    </StyledContainer>
  );
};

export default NotFound;
