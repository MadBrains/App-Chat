import React, { useState } from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import { styled } from '@mui/material/styles';
import MuiTable from '@mui/material/Table';
import MuiTableHead from '@mui/material/TableHead';
import {
  mockSettings,
  MockSettingsTableRows
} from 'src/components/Settings/components/SettingsListTable/_mock';
import SettingsTableBody from 'src/components/Settings/components/SettingsListTable/SettingsTableBody';
import { EnumShowMoreSettingsControls } from 'src/components/Settings/components/SettingsListTable/constants';
import SettingsModal from 'src/components/Settings/components/SettingsModal/SettingsModal';
import EditRoleContainer from 'src/components/Settings/EditRole/EditRoleContainer';

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

export interface SelectedSettingControl {
  settingData: MockSettingsTableRows | null;
  modalType: EnumShowMoreSettingsControls | null;
}

interface SettingsListTableProps {}

const SettingsListTable: React.FC<SettingsListTableProps> = () => {
  const [selectedSettingData, setSelectedSettingData] = useState<SelectedSettingControl>({
    settingData: null,
    modalType: null
  });
  const settingsList = mockSettings;

  return (
    <TableContainer sx={{ marginX: '-50px', width: 'calc(100% + 100px)' }}>
      <Table sx={{ minWidth: 650 }} aria-label='a user table'>
        <TableHead>
          <TableRow>
            <TableCell align='left'>ID</TableCell>
            <TableCell align='left'>Название роли</TableCell>
            <TableCell align='left'>Дата создания</TableCell>
            <TableCell align='left'>Создатель</TableCell>
            <TableCell align='left'>Описание</TableCell>
            <TableCell align='left' />
          </TableRow>
        </TableHead>
        <SettingsTableBody onSettingControl={setSelectedSettingData} settingsList={settingsList} />
      </Table>

      <SettingsModal
        isError={false}
        isOpen={selectedSettingData.modalType}
        onClose={() => setSelectedSettingData(prev => ({ ...prev, modalType: null }))}
      />
      <EditRoleContainer
        selectedSettingData={selectedSettingData}
        setSelectedSettingData={setSelectedSettingData}
      />
    </TableContainer>
  );
};

export default SettingsListTable;
