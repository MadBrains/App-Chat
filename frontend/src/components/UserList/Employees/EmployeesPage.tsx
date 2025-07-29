import React from 'react';
import UserListLayout from 'src/components/UserList/components/UserListLayout';
import UserListTable from 'src/components/UserList/components/UserListTable/UserListTable';

const EmployeesPage: React.FC = () => {
  return (
    <UserListLayout employersPage>
      <UserListTable employersPage />
    </UserListLayout>
  );
};

export default EmployeesPage;
