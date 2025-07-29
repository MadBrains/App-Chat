import React from 'react';
import TableCell from '@mui/material/TableCell';
import MuiTableRow from '@mui/material/TableRow';
import { MockTableRows } from 'src/components/UserList/components/UserListTable/__mock';
import ShowMoreMenu from 'src/components/UserList/components/UserListTable/ShowMoreMenu/ShowMoreMenu';
import { styled } from '@mui/material/styles';
import { SelectedUserControl } from 'src/components/UserList/components/UserListTable/UserListTable';

interface UserTableRowProps extends MockTableRows {
  onUserControl: (userData: SelectedUserControl) => void;
}

const TableRow = styled(MuiTableRow)(({ hidden }) => ({
  opacity: hidden ? 0.5 : 1
}));

const UserTableRow: React.FC<UserTableRowProps> = ({
  id,
  phone,
  role_ids,
  middle_name,
  first_name,
  last_name,
  email,
  outside_name,
  blocked,
  onUserControl,
  user_type,
  about_me
}) => {
  return (
    <TableRow hidden={blocked}>
      <TableCell align='left'>{id}</TableCell>
      <TableCell align='left'>{outside_name}</TableCell>
      <TableCell align='left'>{email}</TableCell>
      <TableCell align='left'>{last_name}</TableCell>
      <TableCell align='left'>{first_name}</TableCell>
      <TableCell align='left'>{middle_name}</TableCell>
      <TableCell align='left'>{}</TableCell>
      <TableCell align='left'>{phone}</TableCell>
      <TableCell align='left'>
        <ShowMoreMenu
          onUserControl={onUserControl}
          id={id}
          phone={phone}
          role_ids={role_ids}
          middle_name={middle_name}
          first_name={first_name}
          last_name={last_name}
          user_type={user_type}
          email={email}
          outside_name={outside_name}
          blocked={blocked}
          userName={outside_name}
        />
      </TableCell>
    </TableRow>
  );
};

export default UserTableRow;
