# AppChat
![Java 17](https://img.shields.io/badge/Java-17-brightgreen)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-brightgreen)
![License](https://img.shields.io/badge/License-GPLv3-blue)

---

Корпоративное веб-приложение для общения с поддержкой приватных и групповых чатов, гибкой ролевой модели, безопасной аутентификацией и WebSocket-уведомлениями.

---

## 📌 Назначение

AppChat предназначен для обмена сообщениями между пользователями внутри организации. Поддерживаются роли, права, локализация, журналирование изменений и работа в реальном времени через WebSocket.

---

## 🛠 Технологии

- Java 17, Spring Boot
- Spring Security (JWT)
- STOMP/WebSocket + SockJS
- Liquibase
- JPA (Hibernate)
- PostgreSQL
- OpenAPI (SpringDoc)
- Lombok, MapStruct
- Passay (валидация паролей)
- i18n (русский, английский)
- SMTP Email (Gmail)

---

## ⚙️ Требования

- Java 17
- PostgreSQL 14+
- Gradle 8+
- SMTP-учётные данные
- Порты: `8080` (HTTP), `5432` (PostgreSQL)

---

## ⚙️ Конфигурация

Пример `.env`:
```env
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/appchat
SPRING_DATASOURCE_USERNAME=admin
SPRING_DATASOURCE_PASSWORD=secret
SPRING_MAIL_USERNAME=youremail@gmail.com
SPRING_MAIL_PASSWORD=emailpassword
APP_JWT_SECRETKEY=your_secure_key
```

> ⚠️ Для Gmail может потребоваться включить "менее безопасные приложения" или использовать App Password.

---

## 🧩 Архитектура

- REST API: пользователи, роли, чаты, сообщения, права
- WebSocket API: сообщения, печать, прочтение, изменение темы
- Сервисный слой с транзакциями
- Журналирование действий (`change_log`, `entity_info`)
- Ролевая модель и `ExtendedPermissionType`

---

## 🔐 Аутентификация

- JWT + Refresh токены
- Фильтры безопасности
- Поддержка `CLIENT` и `WORKER`
- Индивидуальные расширенные права пользователя

---

## 💬 Чаты и сообщения

- Приватные и групповые чаты
- Администраторы чатов
- Темы, иконки, уведомления
- Поддержка reply, read-status
- Уведомления через WebSocket

---

## 🗂 Модель данных

```
[User] ↔ [Role]       (ManyToMany)
[Role] ↔ [Permission] (ManyToMany)
[Chat] → [ChatMember] → [User] (ManyToMany через ассоциацию)
[Chat] → [Message]    (OneToMany)
```

---

## 🔄 Liquibase

- Конфигурация: `db/changelog/db.changelog-master.yaml`
- Версионированные миграции
- Начальные данные: роли, права, администратор

Применение миграций:
```bash
./gradlew liquibaseUpdate
```

---

## 🌐 Локализация

- Языки: русский, английский
- Язык определяется заголовком `Accept-Language`
- Файлы: `messages_ru.properties`, `messages_en.properties`

Добавление языка:
1. Добавить `messages_XX.properties` в `resources/messages`
2. Перезапустить приложение

---

## 🧪 Тестирование

```bash
./gradlew test
```

---

## 🚀 Сборка и запуск

```bash
./gradlew bootRun
```

С переменными окружения:
```bash
SPRING_DATASOURCE_URL=... SPRING_DATASOURCE_USERNAME=... \
SPRING_DATASOURCE_PASSWORD=... SPRING_MAIL_USERNAME=... \
SPRING_MAIL_PASSWORD=... APP_JWT_SECRETKEY=... \
./gradlew bootRun
```

---

## 🧰 Первый запуск

- Swagger UI: [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)
- Администратор по умолчанию:
    - Email: `testtest@gmail.test`
    - Пароль: `password`

---

## 🔌 WebSocket

- Endpoint: `/ws-chat`
- Заголовок: `Authorization: Bearer <token>`
- Топики:
    - `/topic/messages/{chatId}`
    - `/user/queue/typing`
    - `/socket/app`

Пример подписки:
```javascript
stompClient.subscribe('/topic/messages/123', (message) => {
  console.log('New message:', JSON.parse(message.body));
});
```

---

## 📚 Документация API

- Swagger UI: `http://localhost:8080/swagger-ui.html`
- Авторизация через JWT
- Группировка: `app-chat-api`

---

## 📜 Лицензия

Данный проект опубликован под стандартной общественной лицензией GNU GPLv3. Вы можете модифицировать и использовать наши наработки в своих проектах, в т.ч. коммерческих, при обязательном условии публикации их исходного кода. Также мы готовы рассмотреть ваши Pull requests, если вы хотите чтобы наш проект развивался с учётом ваших модификаций и доработок.