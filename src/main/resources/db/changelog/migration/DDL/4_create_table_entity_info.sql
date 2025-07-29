-- liquibase formatted sql

-- changeset kuchart:1669647372218-4

create table if not exists entity_info
(
    id                bigserial
        primary key,
    created_by_system boolean,
    date_time         timestamp,
    entity            varchar(255) not null,
    entity_sample_id  bigint       not null,
    operation_type    varchar(255),
    by_user           integer
        references "user"
);

alter table entity_info
    owner to app_chat;
