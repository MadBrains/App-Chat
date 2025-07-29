import { useEffect, useState } from 'react';
import { getUsers, searchUsers, UserData } from 'src/api/user/user';
import { useQuery } from 'src/utils/hooks/useQuery';
import { toastAlert } from 'src/ui/Alert/toastify';

interface UseUserListProps {
  page?: number;
  sort?: string;
  size?: number;
}

export const useUserList = (query?: UseUserListProps) => {
  const [users, setUsers] = useState<Array<UserData>>([]);

  const { role, search } = useQuery(['role', 'search']);

  useEffect(() => {
    const controller = new AbortController();

    if (search) {
      searchUsers({ text: search, pageable: { sort: [role] } })
        .then(users => setUsers(users))
        .catch(() => toastAlert('Что-то пошло не так', true));
    } else {
      getUsers(controller.signal, {
        pageNumber: query?.page,
        pageSize: query?.size
      }).then(users => setUsers(users));
    }

    return () => controller.abort();
  }, [query?.page, query?.size, role, search]);

  return users;
};
