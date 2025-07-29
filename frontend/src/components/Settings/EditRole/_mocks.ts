export const generalRights = [
  { label: 'Выход на линию', checked: false },
  { label: 'Модерация отделов компании', checked: true },
  { label: 'Создавать групповые чаты', checked: false },
  { label: 'Модерация ролей в системе', checked: true },
  { label: 'Модерация списка банов', checked: false },
  { label: 'Модерация общего списка шаблонов сообщений', checked: false },
  { label: 'Модерация сервисных запросов операторов и feedback реакций клиентов', checked: true }
];

export const staffRights = [
  { label: 'Регистрация новых сотрудников', checked: false },
  { label: 'Импорт сотрудников в систему', checked: true },
  { label: 'Редактировать профили сотрудников', checked: false },
  { label: 'Банить сотрудников и снимать баны', checked: true },
  { label: 'Удалять сотрудников', checked: false },
  { label: 'Сброс пароля сотрудников', checked: false },
  { label: 'Изменение ролей сотрудников', checked: true },
  { label: 'Изменение прав внутри ролей', checked: true },
  { label: 'Видны все сотрудники', checked: true },
  { label: 'Управление сотрудниками отделов', checked: true }
];

export const clientRights = [
  { label: 'Создание клиента', checked: false },
  { label: 'Редактирование клиента', checked: true },
  { label: 'Импорт клиентов в систему', checked: false },
  { label: 'Банить клиентов и снимать баны', checked: true },
  { label: 'Удаление клиента', checked: false },
  { label: 'Управление правами клиента', checked: false },
  { label: 'Доступ к данным клиента при общей задаче', checked: true },
  { label: 'Видны все клиенты в системе', checked: true },
  { label: 'Видны все сообщения клиентов', checked: true },
  { label: 'Экспорт данных по клиентам', checked: true },
  { label: 'Доступ к технической информации клиентов', checked: true }
];
