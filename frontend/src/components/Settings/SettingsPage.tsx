import React from 'react';
import SettingsListLayout from 'src/components/Settings/components/SettingsListLayout';
import SettingsListTable from 'src/components/Settings/components/SettingsListTable/SettingsListTable';

interface SettingsPageProps {}

const SettingsPage: React.FC<SettingsPageProps> = () => {
  return (
    <SettingsListLayout>
      <SettingsListTable />
    </SettingsListLayout>
  );
};

export default SettingsPage;
