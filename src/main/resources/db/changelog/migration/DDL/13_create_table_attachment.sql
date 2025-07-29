-- liquibase formatted sql

-- changeset kuchart:1669647372218-13

create table if not exists attachment
(
    id         bigserial
        primary key,
    message_id bigserial    not null
        references message,
    file_name  varchar(255) not null,
    file_link  varchar(255) not null,
    file_size  integer      not null

);

alter table attachment
    owner to app_chat;