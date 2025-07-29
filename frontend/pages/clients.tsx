import React from "react";
import ClientsPage from "src/components/UserList/Clients/ClientsPage";
import Layout from "src/components/Layout/Layout";
import { NextPageWithLayout } from "src/types/types";

const Clients: NextPageWithLayout = () => {
  return <ClientsPage />;
};

Clients.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Clients;
