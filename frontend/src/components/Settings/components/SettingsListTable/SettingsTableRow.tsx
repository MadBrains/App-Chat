import React from 'react';
import { MockSettingsTableRows } from 'src/components/Settings/components/SettingsListTable/_mock';
import { SelectedSettingControl } from 'src/components/Settings/components/SettingsListTable/SettingsListTable';
import TableCell from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import MuiTableRow from '@mui/material/TableRow';
import ShowMoreSettingsMenu from 'src/components/Settings/components/SettingsListTable/ShowMoreSettingsMenu';

interface SettingsTableRowProps extends MockSettingsTableRows {
  onSettingControl: (settingData: SelectedSettingControl) => void;
}

const TableRow = styled(MuiTableRow)(({ hidden }) => ({
  opacity: hidden ? 0.5 : 1
}));

const SettingsTableRow: React.FC<SettingsTableRowProps> = ({
  id,
  name,
  creationDate,
  creator,
  description,
  onSettingControl
}) => {
  return (
    <TableRow>
      <TableCell align='left'>{id}</TableCell>
      <TableCell align='left'>{name}</TableCell>
      <TableCell align='left'>{creationDate}</TableCell>
      <TableCell align='left'>{creator}</TableCell>
      <TableCell align='left'>{description}</TableCell>
      <TableCell align='left'>
        <ShowMoreSettingsMenu
          onSettingControl={onSettingControl}
          id={id}
          name={name}
          creationDate={creationDate}
          creator={creator}
          description={description}
        />
      </TableCell>
    </TableRow>
  );
};

export default SettingsTableRow;
