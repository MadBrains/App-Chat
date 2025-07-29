-- liquibase formatted sql

-- changeset kuchart:1669647372218-11

create table if not exists chat
(
    id                   bigserial
        primary key,
    avatar_image         varchar(255),
    chat_name            varchar(255),
    chat_permission_list varchar(255),
    description          varchar(255),
    is_deleted           boolean,
    pinned_message_list  varchar(255),
    chat_owner           integer not null
        references "user",
    chat_type_id         bigint  not null
        references chat_type
);

alter table chat
    owner to app_chat;
