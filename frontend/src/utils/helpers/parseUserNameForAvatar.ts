interface UserNameParams {
  firstName?: string;
  middleName?: string;
  lastName?: string;
}

export const parseUserNameForAvatar = ({ firstName, middleName, lastName }: UserNameParams) => {
  const shortUserName: string[] = [];

  if (firstName && firstName[0]) {
    shortUserName.push(firstName[0]);
  }

  if (middleName && middleName[0]) {
    shortUserName.push(middleName[0]);
  }

  if (lastName && lastName[0] && shortUserName.length < 2) {
    shortUserName.push(lastName[0]);
  }

  if (firstName && !lastName && firstName[1] && !middleName) {
    shortUserName.push(firstName[1]);
  }

  if (shortUserName.length === 2) {
    return shortUserName.join('').toUpperCase();
  } else {
    return 'MB';
  }
};
