import React from 'react';
import { useRouter } from 'next/router';
import { EnumRoutes } from 'src/config/routes';
import { Stack } from '@mui/system';
import { Typography } from 'src/ui/Typography/Typography';
import { Box } from 'src/ui/Box/Box';
import SortSelect from 'src/ui/SortSelect/SortSelect';
import { perPageSortOptions } from 'src/components/UserList/components/UserListTable/__mock';
import AddNewUser from 'src/components/UserList/components/UserListTable/AddNewUser/AddNewUser';
import { useQuerySearch } from 'src/utils/hooks/url/useQuerySearch';
import { NoSsr } from '@mui/base';

const UserListTabs: React.FC = () => {
  const router = useRouter();
  const handleRoute = (path: EnumRoutes) => router.push(path);
  const { query, setSearchQuery } = useQuerySearch();
  const isClientPage = router.pathname === EnumRoutes.clients;
  const isEmployersPage = router.pathname === EnumRoutes.employees;

  return (
    <Box display='flex' justifyContent='space-between'>
      <Stack direction='row' spacing={4} component='div'>
        <Typography
          component={isClientPage ? 'h1' : 'h2'}
          variant='h1'
          onClick={() => handleRoute(EnumRoutes.clients)}
          color={isClientPage ? 'primary' : 'secondary'}
          sx={{ cursor: 'pointer' }}
        >
          Клиенты
        </Typography>
        <Typography
          component={isEmployersPage ? 'h1' : 'h2'}
          variant='h1'
          onClick={() => handleRoute(EnumRoutes.employees)}
          color={isEmployersPage ? 'primary' : 'secondary'}
          sx={{ cursor: 'pointer' }}
        >
          Сотрудники
        </Typography>
      </Stack>
      <Stack component='div' spacing={2} direction='row' alignItems='center'>
        <NoSsr>
          <SortSelect
            initialState={typeof query?.size === 'string' ? query?.size : undefined}
            onSelect={value => setSearchQuery({ size: value })}
            options={perPageSortOptions}
          />
        </NoSsr>
        <AddNewUser isEmployersPage={isEmployersPage} />
      </Stack>
    </Box>
  );
};

export default UserListTabs;
