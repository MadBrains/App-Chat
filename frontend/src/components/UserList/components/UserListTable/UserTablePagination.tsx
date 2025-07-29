import MuiPaginationItem from '@mui/material/PaginationItem';
import React from 'react';
import { NoSsr, Pagination } from '@mui/material';
import SvgNextArrowIcon from 'src/assets/icons/arrow/NextArrowIcon';
import SvgPrevArrowIcon from 'src/assets/icons/arrow/PrevArrowIcon';
import SvgDoubleNextIcon from 'src/assets/icons/arrow/DoubleNextIcon';
import SvgDoublePrevIcon from 'src/assets/icons/arrow/DoublePrevIcon';
import { styled } from '@mui/material/styles';
import { useQuerySearch } from 'src/utils/hooks/url/useQuerySearch';

const PaginationItem = styled(MuiPaginationItem)(
  ({ theme }) => `
  &.Mui-selected {
    background-color: transparent;
    text-decoration: underline;
    color: ${theme.palette.primary.main};
  }
`
);

const UserTablePagination: React.FC = () => {
  const { query, setSearchQuery } = useQuerySearch();

  const handleChangePage = (event: unknown, page: number) => {
    setSearchQuery({ page: String(page) });
  };

  return (
    <NoSsr>
      <Pagination
        count={10}
        showFirstButton
        showLastButton
        size='small'
        sx={{ marginX: 'auto', mt: 2, display: 'flex', justifyContent: 'center' }}
        page={typeof query?.page === 'string' ? Number(query.page) : 1}
        onChange={handleChangePage}
        renderItem={item => (
          <PaginationItem
            components={{
              previous: SvgPrevArrowIcon,
              next: SvgNextArrowIcon,
              last: SvgDoubleNextIcon,
              first: SvgDoublePrevIcon
            }}
            {...item}
          />
        )}
      />
    </NoSsr>
  );
};

export default UserTablePagination;
