import React, { PropsWithChildren } from 'react';
import Page from 'src/components/common/Page/Page';
import SettingsListTabs from 'src/components/Settings/components/SettingsListTabs';

interface SettingsListLayoutProps {}

const SettingsListLayout: React.FC<PropsWithChildren<{ employersPage?: boolean }>> = ({
  children,
  employersPage
}) => {
  return (
    <Page title='Настройки'>
      <SettingsListTabs />
      {children}
    </Page>
  );
};

export default SettingsListLayout;
