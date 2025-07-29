import { UserData } from 'src/api/user/user';

export interface MockTableRows {
  id: string | number;
  first_name?: string;
  last_name?: string;
  middle_name?: string;
  outside_name?: string;
  email?: string;
  role_ids?: Array<number>;
  user_type: number;
  phone?: string;
  blocked?: boolean;
  about_me?: string;
}

export const perPageSortOptions = [
  {
    value: '15'
  },
  {
    value: '20'
  },
  {
    value: '25'
  }
];

export const mockTableRows: Array<UserData> = [
  {
    id: 1,
    email: 'sobaka@gmail.com',
    outside_name: 'Бобик',
    first_name: 'Герцог',
    middle_name: 'Викторович',
    last_name: 'Автинский',
    role_ids: [1],
    user_type: 1,
    phone: '+79892331334'
  },
  {
    id: 2,
    email: 'kishka@gmail.com',
    outside_name: 'Мурка',
    first_name: 'Лаша',
    middle_name: 'Егоровна',
    last_name: 'Шевченко',
    role_ids: [1],
    user_type: 1,
    phone: '+79892778334'
  },
  {
    id: 3,
    email: 'sobaka@gmail.com',
    outside_name: 'Бобик',
    first_name: 'Герцог',
    middle_name: 'Викторович',
    last_name: 'Автинский',
    role_ids: [2],
    user_type: 1,
    phone: '+79892331334'
  },
  {
    id: 4,
    email: 'kishka@gmail.com',
    outside_name: 'Мурка',
    first_name: 'Лаша',
    middle_name: 'Егоровна',
    last_name: 'Шевченко',
    role_ids: [2],
    user_type: 1,
    phone: '+79892778334'
  },
  {
    id: 5,
    email: 'sobaka@gmail.com',
    outside_name: 'Бобик',
    first_name: 'Герцог',
    middle_name: 'Викторович',
    last_name: 'Автинский',
    role_ids: [2],
    user_type: 1,
    phone: '+79892331334'
  },
  {
    id: 6,
    email: 'kishka@gmail.com',
    outside_name: 'Мурка',
    first_name: 'Лаша',
    middle_name: 'Егоровна',
    last_name: 'Шевченко',
    role_ids: [2],
    user_type: 1,
    phone: '+79892778334'
  },
  {
    id: 7,
    email: 'sobaka@gmail.com',
    outside_name: 'Бобик',
    first_name: 'Герцог',
    middle_name: 'Викторович',
    last_name: 'Автинский',
    role_ids: [2],
    user_type: 1,
    phone: '+79892331334'
  },
  {
    id: 8,
    email: 'kishka@gmail.com',
    outside_name: 'Мурка',
    first_name: 'Лаша',
    middle_name: 'Егоровна',
    last_name: 'Шевченко',
    role_ids: [2],
    user_type: 1,
    phone: '+79892778334'
  },
  {
    id: 9,
    email: 'sobaka@gmail.com',
    outside_name: 'Бобик',
    first_name: 'Герцог',
    middle_name: 'Викторович',
    last_name: 'Автинский',
    role_ids: [2],
    user_type: 1,
    phone: '+79892331334'
  },
  {
    id: 10,
    email: 'kishka@gmail.com',
    outside_name: 'Мурка',
    first_name: 'Лаша',
    middle_name: 'Егоровна',
    last_name: 'Шевченко',
    role_ids: [2],
    user_type: 1,
    phone: '+79892778334'
  },
  {
    id: 11,
    email: 'sobaka@gmail.com',
    outside_name: 'Бобик',
    first_name: 'Герцог',
    middle_name: 'Викторович',
    last_name: 'Автинский',
    role_ids: [2],
    user_type: 1,
    phone: '+79892331334'
  },
  {
    id: 12,
    email: 'kishka@gmail.com',
    outside_name: 'Мурка',
    first_name: 'Лаша',
    middle_name: 'Егоровна',
    last_name: 'Шевченко',
    role_ids: [2],
    user_type: 1,
    phone: '+79892778334'
  },
  {
    id: 13,
    email: 'sobaka@gmail.com',
    outside_name: 'Бобик',
    first_name: 'Герцог',
    middle_name: 'Викторович',
    last_name: 'Автинский',
    role_ids: [1],
    user_type: 1,
    phone: '+79892331334'
  },
  {
    id: 14,
    email: 'kishka@gmail.com',
    outside_name: 'Мурка',
    first_name: 'Лаша',
    middle_name: 'Егоровна',
    last_name: 'Шевченко',
    role_ids: [1],
    user_type: 1,
    phone: '+79892778334'
  }
];
