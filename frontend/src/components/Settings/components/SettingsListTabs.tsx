import React from 'react';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import { TabSetting, TabsListSetting } from './styled';

export enum EnumSettingsTabsType {
  roles = 'roles',
  generalSettings = 'generalSettings',
  recovery = 'recovery'
}

interface SettingsListTabsProps {}

const SettingsListTabs: React.FC<SettingsListTabsProps> = () => {
  return (
    <TabsUnstyled defaultValue={EnumSettingsTabsType.roles}>
      <TabsListSetting>
        <TabSetting value={EnumSettingsTabsType.roles}>Роли</TabSetting>
        <TabSetting value={EnumSettingsTabsType.generalSettings}>Общие настройки</TabSetting>
        <TabSetting value={EnumSettingsTabsType.recovery}>Восстановление</TabSetting>
      </TabsListSetting>
    </TabsUnstyled>
  );
};

export default SettingsListTabs;
