import React, { memo } from 'react';
import {
  MockTableRows,
  mockTableRows
} from 'src/components/UserList/components/UserListTable/__mock';
import UserTableRow from 'src/components/UserList/components/UserListTable/UserTableRow';
import TableBody from '@mui/material/TableBody';
import { SelectedUserControl } from 'src/components/UserList/components/UserListTable/UserListTable';

interface UserTableBodyProps {
  onUserControl: (userData: SelectedUserControl) => void;
  employersPage?: boolean;
  usersList: Array<MockTableRows>;
}

const UserTableBody: React.FC<UserTableBodyProps> = ({
  onUserControl,
  employersPage,
  usersList
}) => {
  return (
    <TableBody>
      {usersList.map(row => (
        <UserTableRow role_ids={[1, 2]} onUserControl={onUserControl} key={row.id} {...row} />
      ))}
    </TableBody>
  );
};

export default memo(UserTableBody);
