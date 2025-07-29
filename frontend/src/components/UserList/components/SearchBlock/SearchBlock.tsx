import React, { useState } from 'react';
import {
  BlockUsersBlock,
  SearchBlockContainer,
  SearchBlockHead
} from 'src/components/UserList/components/SearchBlock/styled';
import TextInput from 'src/ui/TextInput/TextInput';
import { FormControlLabel, IconButton, InputAdornment, NoSsr } from '@mui/material';
import CloseIcon from 'src/assets/icons/CloseIcon';
import { Button } from 'src/ui/Button/Button';
import { useQuerySearch } from 'src/utils/hooks/url/useQuerySearch';
import RoleSelector from 'src/components/Select/RoleSelector';
import { StyledSwitch } from 'src/ui/Switch/StyledSwitch';

interface SearchBlockProps {
  withRole?: boolean;
}

const SearchBlock: React.FC<SearchBlockProps> = ({ withRole }) => {
  const { query, setSearchQuery } = useQuerySearch();
  const [searchState, setSearchState] = useState({
    search: typeof query?.search === 'string' ? query.search : '',
    role: typeof query?.role === 'string' ? query.role : '',
    blocked: typeof query?.blocked === 'string' ? query.blocked : ''
  });

  const handlePressEnter = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      setSearchQuery(searchState);
    }
  };

  return (
    <SearchBlockContainer>
      <SearchBlockHead>
        <TextInput
          value={searchState.search}
          onChange={event =>
            setSearchState(prevState => ({ ...prevState, search: event.target?.value }))
          }
          onKeyDown={handlePressEnter}
          placeholder='Поиск'
          sx={{
            marginRight: '14px',
            '& .MuiInputBase-root ': {
              borderRadius: '100px',
              width: '100%',
              border: `1px solid`,
              borderColor: 'transparent'
            },
            '& input ': {
              height: 46,
              fontSize: 16,
              boxSizing: 'inherit',
              display: 'block',
              textAlign: 'center',
              paddingTop: 0,
              paddingBottom: 0
            }
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  onClick={() => setSearchState(prevState => ({ ...prevState, search: '' }))}
                >
                  <CloseIcon height={12} width={12} />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        {withRole && (
          <NoSsr>
            <RoleSelector
              label='Роль'
              sx={{ height: '48px', marginRight: '14px' }}
              value={searchState.role}
              onChange={event =>
                setSearchState(prevState => ({ ...prevState, role: event.target.value as string }))
              }
            />
          </NoSsr>
        )}
        <Button
          color='primary'
          variant='contained'
          sx={{ maxWidth: 436 }}
          onClick={() => setSearchQuery(searchState)}
        >
          Искать
        </Button>
      </SearchBlockHead>
      <BlockUsersBlock>
        <NoSsr>
          <FormControlLabel
            checked={!!searchState.blocked}
            onChange={(event, checked) =>
              setSearchState(prevState => ({ ...prevState, blocked: checked ? 'hide' : '' }))
            }
            control={<StyledSwitch />}
            label='Показать заблокированных пользователей'
            componentsProps={{ typography: { variant: 'h3' } }}
            sx={{ margin: 0 }}
          />
        </NoSsr>
      </BlockUsersBlock>
    </SearchBlockContainer>
  );
};

export default SearchBlock;
