-- liquibase formatted sql

-- changeset kuchart:1669647372218-14

create table if not exists chat_member
(
    id                   bigserial
        primary key,
    archived             boolean not null,
    ignore_invocation    boolean,
    is_admin             boolean,
    muted_to             timestamp,
    chat_id              bigint  not null
        references chat,
    user_id              integer not null
        references "user",
    last_read_message_id bigint
        references message,
    start_message_id     bigint
        references message
);

alter table chat_member
    owner to app_chat;
