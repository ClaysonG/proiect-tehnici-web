-- Role: anunturi_auto
-- DROP ROLE IF EXISTS anunturi_auto;

CREATE ROLE anunturi_auto WITH
  LOGIN
  NOSUPERUSER
  INHERIT
  NOCREATEDB
  NOCREATEROLE
  NOREPLICATION
  ENCRYPTED PASSWORD 'SCRAM-SHA-256$4096:FGKCJBTwvbuDmyLdOF5z5A==$IgMoG1S36b1wfYqE7HVZGmYjHqCgkz4hHcpKg1/+WX0=:1bpEK/0mm0+elSVTwSTOvwiD+RPo3nGAcsJJ+A5aX5s=';

-- Type: category

-- DROP TYPE IF EXISTS public.category;

CREATE TYPE public.category AS ENUM
    ('autoturisme', 'autoutilitare', 'motociclete');

ALTER TYPE public.category
    OWNER TO postgres;

-- Type: roles

-- DROP TYPE IF EXISTS public.roles;

CREATE TYPE public.roles AS ENUM
    ('admin', 'moderator', 'common');

ALTER TYPE public.roles
    OWNER TO postgres;

-- Table: public.body_types

-- DROP TABLE IF EXISTS public.body_types;

CREATE TABLE IF NOT EXISTS public.body_types
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    name character varying COLLATE pg_catalog."default" NOT NULL,
    category category NOT NULL,
    created_at date NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT body_types_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.body_types
    OWNER to postgres;

GRANT ALL ON TABLE public.body_types TO anunturi_auto;

GRANT ALL ON TABLE public.body_types TO postgres;

-- Table: public.colors

-- DROP TABLE IF EXISTS public.colors;

CREATE TABLE IF NOT EXISTS public.colors
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    name character varying COLLATE pg_catalog."default" NOT NULL,
    created_at date NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT colors_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.colors
    OWNER to postgres;

GRANT ALL ON TABLE public.colors TO anunturi_auto;

GRANT ALL ON TABLE public.colors TO postgres;

-- Table: public.fuel_types

-- DROP TABLE IF EXISTS public.fuel_types;

CREATE TABLE IF NOT EXISTS public.fuel_types
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    name character varying COLLATE pg_catalog."default" NOT NULL,
    created_at date NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fuel_types_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.fuel_types
    OWNER to postgres;

GRANT ALL ON TABLE public.fuel_types TO anunturi_auto;

GRANT ALL ON TABLE public.fuel_types TO postgres;

-- Table: public.gearbox_types

-- DROP TABLE IF EXISTS public.gearbox_types;

CREATE TABLE IF NOT EXISTS public.gearbox_types
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    name character varying COLLATE pg_catalog."default" NOT NULL,
    created_at date NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT gearbox_types_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.gearbox_types
    OWNER to postgres;

GRANT ALL ON TABLE public.gearbox_types TO anunturi_auto;

GRANT ALL ON TABLE public.gearbox_types TO postgres;

-- Table: public.transmission_types

-- DROP TABLE IF EXISTS public.transmission_types;

CREATE TABLE IF NOT EXISTS public.transmission_types
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    name character varying COLLATE pg_catalog."default" NOT NULL,
    created_at date NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT transmission_types_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.transmission_types
    OWNER to postgres;

GRANT ALL ON TABLE public.transmission_types TO anunturi_auto;

GRANT ALL ON TABLE public.transmission_types TO postgres;

-- Table: public.makes

-- DROP TABLE IF EXISTS public.makes;

CREATE TABLE IF NOT EXISTS public.makes
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    name character varying COLLATE pg_catalog."default" NOT NULL,
    created_at date NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT makes_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.makes
    OWNER to postgres;

GRANT ALL ON TABLE public.makes TO anunturi_auto;

GRANT ALL ON TABLE public.makes TO postgres;

-- Table: public.models

-- DROP TABLE IF EXISTS public.models;

CREATE TABLE IF NOT EXISTS public.models
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    name character varying COLLATE pg_catalog."default",
    category category,
    make_id integer,
    created_at date DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT models_pkey PRIMARY KEY (id),
    CONSTRAINT models_makes_fkey FOREIGN KEY (make_id)
        REFERENCES public.makes (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.models
    OWNER to postgres;

GRANT ALL ON TABLE public.models TO anunturi_auto;

GRANT ALL ON TABLE public.models TO postgres;
-- Index: fki_models_makes_fkey

-- DROP INDEX IF EXISTS public.fki_models_makes_fkey;

CREATE INDEX IF NOT EXISTS fki_models_makes_fkey
    ON public.models USING btree
    (make_id ASC NULLS LAST)
    TABLESPACE pg_default;

-- Table: public.products

-- DROP TABLE IF EXISTS public.products;

CREATE TABLE IF NOT EXISTS public.products
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    name character varying(200) COLLATE pg_catalog."default" NOT NULL,
    description character varying(1000) COLLATE pg_catalog."default" NOT NULL,
    image character varying COLLATE pg_catalog."default" NOT NULL,
    category category NOT NULL,
    make_id integer NOT NULL,
    model_id integer NOT NULL,
    body_type_id integer NOT NULL,
    engine_power numeric,
    mileage numeric,
    year numeric,
    fuel_type_id integer,
    gearbox_type_id integer,
    transmission_type_id integer,
    cilindrical_capacity numeric,
    color_id integer,
    features character varying COLLATE pg_catalog."default",
    price numeric NOT NULL,
    is_second_hand boolean NOT NULL,
    is_sold boolean NOT NULL,
    user_id integer NOT NULL,
    created_at date NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT products_pkey PRIMARY KEY (id),
    CONSTRAINT products_body_types_fkey FOREIGN KEY (body_type_id)
        REFERENCES public.body_types (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT products_colors_fkey FOREIGN KEY (color_id)
        REFERENCES public.colors (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT products_fuel_types_fkey FOREIGN KEY (fuel_type_id)
        REFERENCES public.fuel_types (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT products_gearbox_types_fkey FOREIGN KEY (gearbox_type_id)
        REFERENCES public.gearbox_types (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT products_makes_fkey FOREIGN KEY (make_id)
        REFERENCES public.makes (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT products_models_fkey FOREIGN KEY (model_id)
        REFERENCES public.models (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT products_transmission_types_fkey FOREIGN KEY (transmission_type_id)
        REFERENCES public.transmission_types (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.products
    OWNER to postgres;

GRANT ALL ON TABLE public.products TO anunturi_auto;

GRANT ALL ON TABLE public.products TO postgres;
-- Index: fki_products_body_types_fkey

-- DROP INDEX IF EXISTS public.fki_products_body_types_fkey;

CREATE INDEX IF NOT EXISTS fki_products_body_types_fkey
    ON public.products USING btree
    (body_type_id ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: fki_products_colors_fkey

-- DROP INDEX IF EXISTS public.fki_products_colors_fkey;

CREATE INDEX IF NOT EXISTS fki_products_colors_fkey
    ON public.products USING btree
    (color_id ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: fki_products_fuel_types_fkey

-- DROP INDEX IF EXISTS public.fki_products_fuel_types_fkey;

CREATE INDEX IF NOT EXISTS fki_products_fuel_types_fkey
    ON public.products USING btree
    (fuel_type_id ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: fki_products_gearbox_types_fkey

-- DROP INDEX IF EXISTS public.fki_products_gearbox_types_fkey;

CREATE INDEX IF NOT EXISTS fki_products_gearbox_types_fkey
    ON public.products USING btree
    (gearbox_type_id ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: fki_products_makes_fkey

-- DROP INDEX IF EXISTS public.fki_products_makes_fkey;

CREATE INDEX IF NOT EXISTS fki_products_makes_fkey
    ON public.products USING btree
    (make_id ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: fki_products_models_fkey

-- DROP INDEX IF EXISTS public.fki_products_models_fkey;

CREATE INDEX IF NOT EXISTS fki_products_models_fkey
    ON public.products USING btree
    (model_id ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: fki_products_transmission_types_fkey

-- DROP INDEX IF EXISTS public.fki_products_transmission_types_fkey;

CREATE INDEX IF NOT EXISTS fki_products_transmission_types_fkey
    ON public.products USING btree
    (transmission_type_id ASC NULLS LAST)
    TABLESPACE pg_default;

-- Table: public.users

-- DROP TABLE IF EXISTS public.users;

CREATE TABLE IF NOT EXISTS public.users
(
    id integer NOT NULL DEFAULT nextval('users_id_seq'::regclass),
    user_name character varying(50) COLLATE pg_catalog."default" NOT NULL,
    last_name character varying(100) COLLATE pg_catalog."default" NOT NULL,
    first_name character varying(100) COLLATE pg_catalog."default" NOT NULL,
    user_image character varying(500) COLLATE pg_catalog."default" DEFAULT 'default_user_image'::character varying,
    birth_date date NOT NULL,
    email character varying(100) COLLATE pg_catalog."default" NOT NULL,
    password character varying(500) COLLATE pg_catalog."default" NOT NULL,
    role roles NOT NULL DEFAULT 'common'::roles,
    site_theme character varying(100) COLLATE pg_catalog."default" DEFAULT 'light'::character varying,
    chat_color character varying(50) COLLATE pg_catalog."default" NOT NULL,
    code character varying(200) COLLATE pg_catalog."default",
    verified_mail boolean DEFAULT false,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT users_user_name_key UNIQUE (user_name)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users
    OWNER to postgres;
