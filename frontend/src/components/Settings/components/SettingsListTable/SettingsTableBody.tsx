import React from 'react';
import TableBody from '@mui/material/TableBody';
import { MockSettingsTableRows } from 'src/components/Settings/components/SettingsListTable/_mock';
import SettingsTableRow from 'src/components/Settings/components/SettingsListTable/SettingsTableRow';
import { SelectedSettingControl } from 'src/components/Settings/components/SettingsListTable/SettingsListTable';

interface SettingsTableBodyProps {
  onSettingControl: (settingData: SelectedSettingControl) => void;
  settingsList: Array<MockSettingsTableRows>;
}

const SettingsTableBody: React.FC<SettingsTableBodyProps> = ({
  onSettingControl,
  settingsList
}) => {
  return (
    <TableBody>
      {settingsList.map(row => (
        <SettingsTableRow onSettingControl={onSettingControl} key={row.id} {...row} />
      ))}
    </TableBody>
  );
};

export default SettingsTableBody;
