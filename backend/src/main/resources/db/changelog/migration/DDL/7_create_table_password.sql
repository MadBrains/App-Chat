-- liquibase formatted sql

-- changeset kuchart:1669647372218-7

create table if not exists password
(
    id         bigserial
        primary key,
    created_at timestamp    not null,
    is_actual  boolean,
    password   varchar(255) not null,
    user_id    integer      not null
        references "user"
);

alter table password
    owner to app_chat;
