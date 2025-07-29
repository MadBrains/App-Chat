import { useEffect, useState } from 'react';
import { getUsers, UserData } from 'src/api/user/user';

export const useUserTable = () => {
  const [userList, setData] = useState<UserData[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    getUsers(controller.signal).then(userList => setData(userList));
    return () => controller.abort();
  }, []);

  return userList;
};
