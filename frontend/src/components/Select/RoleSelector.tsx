import React from 'react';
import SelectField, { SelectFieldProps } from 'src/ui/Select/Select';
import { useRolesSelector } from 'src/components/Select/useRolesSelector';

const RoleSelector: React.FC<Omit<SelectFieldProps, 'options'>> = props => {
  const options = useRolesSelector();

  return <SelectField defaultValue='' options={options} {...props} />;
};

export default RoleSelector;
