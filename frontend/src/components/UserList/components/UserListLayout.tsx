import React, { PropsWithChildren } from 'react';
import Page from 'src/components/common/Page/Page';
import UserListTabs from 'src/components/UserList/components/UserListTabs';
import UserTablePagination from 'src/components/UserList/components/UserListTable/UserTablePagination';
import SortSelect from 'src/ui/SortSelect/SortSelect';
import SearchBlock from 'src/components/UserList/components/SearchBlock/SearchBlock';
import { useQuerySearch } from 'src/utils/hooks/url/useQuerySearch';

const UserListLayout: React.FC<PropsWithChildren<{ employersPage?: boolean }>> = ({
  children,
  employersPage
}) => {
  return (
    <Page>
      <UserListTabs />
      <SearchBlock withRole />
      {children}
      {/*<UserTablePagination />*/}
    </Page>
  );
};

export default UserListLayout;
