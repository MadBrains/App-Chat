import React, { useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useRouter } from 'next/router';
import { EnumInviteAction, invite, InviteType } from 'src/api/auth/login';
import { useQuery } from 'src/utils/hooks/useQuery';
import { EnumRoutes } from 'src/config/routes';

export const AuthorizationAccept = () => {
  const { uuid } = useQuery(['uuid']);
  const router = useRouter();

  const inviteReroute = (action: EnumInviteAction, data: InviteType) => {
    if (action === EnumInviteAction.PASSWORD_CHANGE) {
      router.push({
        pathname: EnumRoutes.authNewPassword,
        query: { uuid, userId: data.user_id }
      });
      return;
    }
    if (action === EnumInviteAction.REGISTRATION) {
      router.push({
        pathname: EnumRoutes.createPassword,
        query: { uuid, inviteValue: data.invite_value }
      });
      return;
    }
    return;
  };

  useEffect(() => {
    if (uuid)
      invite(uuid)
        .then(res => inviteReroute(res.data.action, res.data))
        .catch(() => router.push({ pathname: EnumRoutes.authRecovery, query: { teapot: 'true' } }));
  }, [router, uuid]);

  return (
    <Box sx={{ display: 'flex', height: '100vh', justifyContent: 'center' }}>
      <Box sx={{ transform: 'translate(0, 50%)' }}>
        <CircularProgress />
      </Box>
    </Box>
  );
};

export default AuthorizationAccept;
