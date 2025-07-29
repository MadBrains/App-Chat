import { NextPageWithLayout } from "src/types/types";
import Layout from "src/components/Layout/Layout";
import React from "react";
import SettingsPage from "src/components/Settings/SettingsPage";

const Settings: NextPageWithLayout = () => {
  return <SettingsPage />;
};

Settings.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Settings;
