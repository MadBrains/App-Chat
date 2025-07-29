import React, { useEffect, useRef, useState } from 'react';
import MuiTable from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import MuiTableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import UserTableBody from 'src/components/UserList/components/UserListTable/UserTableBody';
import { EnumShowMoreControls } from 'src/components/UserList/components/UserListTable/ShowMoreMenu/constants';
import BlockingUserDrawer from 'src/components/UserList/components/UserListTable/BlockingUserDrawer/BlockingUserDrawer';
import UserTablePagination from 'src/components/UserList/components/UserListTable/UserTablePagination';
import { useUserList } from 'src/api/user/hooks';
import {
  MockTableRows,
  mockTableRows
} from 'src/components/UserList/components/UserListTable/__mock';
import queryString from 'query-string';
import { useRouter } from 'next/router';
import { UserData } from 'src/api/user/user';
import EditUserFormContainer from 'src/components/UserList/components/UserListTable/ShowMoreMenu/components/EditUserFormContainer';
import NothingFound from 'src/components/UserList/components/UserListTable/NothingFound/NothingFound';

const Table = styled(MuiTable)(
  ({ theme }) => `
  border-collapse: separate;
  tr th:first-of-type {
    padding-left: 50px;
  }

  tr td:first-of-type {
    padding-left: 50px;
  }

  tr > * {
    font-size: 14px;
    line-height: 18px;
    color: ${theme.palette.primary.main};
  }
`
);

const TableHead = styled(MuiTableHead)(({ theme }) => ({
  '& th': {
    color: theme.palette.info.dark,
    fontWeight: 400
  }
}));
export interface EditWorkerParam {
  email: string;
  first_name: string;
  id: number;
  last_name: string;
  user_type: number;
  middle_name: string;
  outside_name: string;
}

export interface SelectedUserControl {
  userData: UserData | null;
  modalType: EnumShowMoreControls | null;
}
export interface employersPageProps {
  employersPage?: boolean;
}
const UserListTable: React.FC<employersPageProps> = ({ employersPage }) => {
  const [selectedUserData, setSelectedUserData] = useState<SelectedUserControl>({
    userData: null,
    modalType: null
  });
  const [editUser, setEditUser] = useState<EditWorkerParam>();
  const router = useRouter();

  const list = useUserList(router.query).map(user =>
    editUser && user.id === editUser.id ? { ...editUser } : { ...user }
  );
  const usersList = employersPage ? list : mockTableRows;
  const sortSize = Number(queryString.parseUrl(router.asPath).query.size);

  if (usersList.length === 0) return <NothingFound />;

  return (
    <TableContainer sx={{ mt: 10, marginX: '-50px', width: 'calc(100% + 100px)' }}>
      <Table sx={{ minWidth: 650 }} aria-label='a user table'>
        <TableHead>
          <TableRow>
            <TableCell align='left'>ID</TableCell>
            <TableCell align='left'>Внешнее имя</TableCell>
            <TableCell align='left'>E-mail</TableCell>
            <TableCell align='left'>Фамилия</TableCell>
            <TableCell align='left'>Имя</TableCell>
            <TableCell align='left'>Отчество</TableCell>
            <TableCell align='left'>Роль</TableCell>
            <TableCell align='left'>Телефон</TableCell>
            <TableCell align='left' />
          </TableRow>
        </TableHead>
        <UserTableBody
          onUserControl={setSelectedUserData}
          employersPage={employersPage}
          usersList={usersList}
        />
      </Table>
      {usersList.length > sortSize && <UserTablePagination />}

      <EditUserFormContainer
        selectedUserData={selectedUserData}
        setSelectedUserData={setSelectedUserData}
        setEditUser={setEditUser}
      />
      <BlockingUserDrawer
        selectedUserData={selectedUserData}
        isOpen={selectedUserData.modalType === EnumShowMoreControls.blocked}
        onClose={() => setSelectedUserData(prev => ({ ...prev, modalType: null }))}
        isBlockedUser={false}
      />
    </TableContainer>
  );
};

export default UserListTable;
