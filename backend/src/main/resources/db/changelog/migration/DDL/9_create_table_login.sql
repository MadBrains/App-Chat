-- liquibase formatted sql

-- changeset kuchart:1669647372218-9

create table if not exists login
(
    id                bigserial primary key,
    method            varchar(255) not null,
    method_value      varchar(255) not null,
    password_required boolean,
    user_id           integer      not null
        references "user"
);

alter table login
    owner to app_chat;
