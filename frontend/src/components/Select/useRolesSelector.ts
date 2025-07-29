import { useEffect, useState } from 'react';
import { getAdminRoles } from 'src/api/admin/roles';
import { SelectOptionsItemProps } from 'src/ui/Select/Select';

const emptySelect = [{ label: '', value: '' }];

export const useRolesSelector = () => {
  const [options, setOptions] = useState<Array<SelectOptionsItemProps>>();

  useEffect(() => {
    const controller = new AbortController();
    getAdminRoles({ signal: controller.signal }).then(res => {
      const roles = res && res.map(role => ({ value: String(role.id), label: role.role_name }));
      setOptions(() => [...emptySelect, ...roles]);
    });
    return () => controller.abort();
  }, []);

  return options;
};
