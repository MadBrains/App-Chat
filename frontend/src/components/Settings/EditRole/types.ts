export enum EnumRights {
  GENERAL_RIGHTS = 'GENERAL_RIGHTS',
  CLIENTS_RIGHTS = 'CLIENTS_RIGHTS',
  STAFF_RIGHTS = 'STAFF_RIGHTS'
}

export const titles = {
  [EnumRights.GENERAL_RIGHTS]: 'Общие права работы в системе',
  [EnumRights.CLIENTS_RIGHTS]: 'Права по сотрудникам',
  [EnumRights.STAFF_RIGHTS]: 'Права по клиентам'
};
