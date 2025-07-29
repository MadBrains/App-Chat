import React, { PropsWithChildren, useEffect } from 'react';
import Sidebar from 'src/components/Layout/components/Sidebar/Sidebar';
import { Box } from '@mui/material';
import { mainSx } from 'src/components/Layout/styled';
import { useDispatch } from 'src/redux/store';
import { getProfile } from 'src/redux/slices/profileSlice';
import { getAuthTokens } from 'src/utils/helpers/authHelper';
import { useRouter } from 'next/router';
import { EnumRoutes } from 'src/config/routes';

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const refresh_token = getAuthTokens().refresh_token;

    if (!refresh_token) router.push(EnumRoutes.auth);
  }, [router]);

  useEffect(() => {
    const controller = new AbortController();
    dispatch(getProfile({ signal: controller.signal }));
    return () => controller.abort();
  }, [dispatch]);

  return (
    <>
      <Box component='main' sx={mainSx}>
        {children}
      </Box>
      <Sidebar />
    </>
  );
};

export default Layout;
