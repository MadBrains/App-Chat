-- liquibase formatted sql

-- changeset kuchart:1669647372218-16

create table if not exists ban
(
    id                   bigserial
        primary key,
    ban_name             varchar(255) not null,
    description          varchar,
    for_client           boolean      not null,
    for_user             boolean      not null,
    "system"             boolean      not null,
    excluded_permission  varchar,
    default_ban_duration timestamp

);

alter table ban
    owner to app_chat;