-- liquibase formatted sql

-- changeset kuchart:1669647372218-3

create table if not exists change_log
(
    id               bigserial primary key,
    date_time        timestamp,
    detailed         varchar(255),
    entity           varchar(255) not null,
    entity_sample_id integer      not null,
    field            varchar(255),
    new_state        varchar(255),
    old_state        varchar(255),
    by_user          integer
        references "user"
);

alter table change_log
    owner to app_chat;
