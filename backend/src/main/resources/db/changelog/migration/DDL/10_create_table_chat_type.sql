-- liquibase formatted sql

-- changeset kuchart:1669647372218-10

create table if not exists chat_type
(
    id                    bigserial
        primary key,
    available_permissions varchar(255),
    chat_type_name        varchar(255),
    default_permissions   varchar(255)
);

alter table chat_type
    owner to app_chat;
