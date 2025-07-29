-- liquibase formatted sql

-- changeset kuchart:1669647372218-12

create table if not exists message
(
    id                  bigserial
        primary key,
    user_id             integer not null
        references "user",
    sent_at             timestamp,
    chat_id             bigint  not null
        references chat,
    contains_message_id integer
        references "user",
    body                text,
    updated_at          timestamp,
    deleted             boolean not null default false,
    "system"            boolean not null default false,
    first_read_at       timestamp,
    has_attachment      boolean not null default false
);

alter table message
    owner to app_chat;
