create type status as enum ('Open', 'Close');
create type topic as enum ('Sport', 'Life', 'Study', 'Other');

create table public.user (
    id bigint generated always as identity primary key,
    login varchar(20) not null unique,
    password varchar(200) not null,
    email varchar(30),
    role varchar(50) not null
);

create table task (
                      id bigint generated always as identity primary key,
                      create_time timestamp DEFAULT NOW(),
                      name varchar(20) not null,
                      id_user bigint REFERENCES public.user(id) on delete set null,
                      description varchar(200) not null,
                      status status not null,
                      topic topic not null
);