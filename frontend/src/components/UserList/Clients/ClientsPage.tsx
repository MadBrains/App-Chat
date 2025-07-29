import React from 'react';
import UserListLayout from 'src/components/UserList/components/UserListLayout';
import UserListTable from 'src/components/UserList/components/UserListTable/UserListTable';

const ClientsPage: React.FC = () => {
  return (
    <UserListLayout>
      <UserListTable />
    </UserListLayout>
  );
};

export default ClientsPage;
