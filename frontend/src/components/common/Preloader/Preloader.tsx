import React from 'react';
import styled from '@emotion/styled';
import { Colors } from 'src/config/colors';

const PreloaderContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  border: 12px solid ${Colors.lightGray};
  border-top: 12px solid ${Colors.black};
  border-radius: 50%;
  width: 100px;
  height: 100px;
  animation: spin 2s linear infinite;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Preloader: React.FC = () => {
  return <PreloaderContainer />;
};

export default Preloader;
