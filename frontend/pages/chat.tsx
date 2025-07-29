import React from "react";
import Chat from "src/components/Chat/Chat";
import Layout from "src/components/Layout/Layout";
import { NextPageWithLayout } from "src/types/types";

const Chats: NextPageWithLayout = () => <Chat />;

Chats.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Chats;
