CREATE DATABASE prost;

CREATE TABLE "customer" (
  "id" SERIAL PRIMARY KEY,
  "first_name" varchar,
  "last_name" varchar,
  "user_name" varchar,
  "id_facebook" varchar,
  "id_google" varchar,
);

--CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE "owner" (
  "id" SERIAL PRIMARY KEY,
  "user_name" varchar(255), 
  "first_name" varchar(255),
  "last_name" varchar(255),
  "password" varchar(255),
  "email" varchar(255),
 );

CREATE TABLE "eContact" (
  "id" SERIAL PRIMARY KEY,
  "id_customer" int,
  "first_name" varchar,
  "last_name" varchar,
  "phone_number" varchar,
  "qrcode" varchar,
  "email" varchar,
);

CREATE TABLE "bar" (
  "id" SERIAL PRIMARY KEY,
  "bar_name" varchar,
  "phone_number" varchar,
  "id_owner" int,
  "address" varchar,
  "city" varchar, 
  "state" varchar, 
  "zip" varchar,
  "qrcode" varchar,
);

CREATE TABLE "menu" (
  "id" SERIAL PRIMARY KEY,
  "image" varchar,
  "id_bar" int,
);

CREATE TABLE "party" (
  "id" SERIAL PRIMARY KEY,
  "id_bar" int,
  "size" int,
);

CREATE TABLE "friendship" (
  "id" SERIAL PRIMARY KEY,
  "id_customer" int,
  "id_friend" int,
);

CREATE TABLE "message" (
  "id" SERIAL PRIMARY KEY,
  "body" varchar,
  "id_customer" int,
  "id_thread" int,
);

CREATE TABLE "thread" (
  "id" SERIAL PRIMARY KEY,
);

CREATE TABLE "image" (
  "id" SERIAL PRIMARY KEY,
  "image" varchar,
  "id_customer" int,
  "id_bar" int,
  "id_message" int,
);


CREATE TABLE "customers_bars" (
  "id" SERIAL PRIMARY KEY,
  "id_customer" int,
  "id_bar" int,
  "favorite" boolean,
  "checkin" boolean
);

CREATE TABLE "parties_customers" (
  "id" SERIAL PRIMARY KEY,
  "id_customer" int,
  "id_host" int,
  "id_party" int,
);

ALTER TABLE "eContact" ADD FOREIGN KEY ("id_customer") REFERENCES "customer" ("id");

ALTER TABLE "menu" ADD FOREIGN KEY ("id_bar") REFERENCES "bar" ("id");

ALTER TABLE "image" ADD FOREIGN KEY ("id_customer") REFERENCES "customer" ("id");

ALTER TABLE "image" ADD FOREIGN KEY ("id_bar") REFERENCES "bar" ("id");

ALTER TABLE "customers_bars" ADD FOREIGN KEY ("id_customer") REFERENCES "customer" ("id");

ALTER TABLE "customers_bars" ADD FOREIGN KEY ("id_bar") REFERENCES "bar" ("id");

ALTER TABLE "party" ADD FOREIGN KEY ("id_bar") REFERENCES "bar" ("id");

ALTER TABLE "parties_customers" ADD FOREIGN KEY ("id_party") REFERENCES "party" ("id");

ALTER TABLE "parties_customers" ADD FOREIGN KEY ("id_customer") REFERENCES "customer" ("id");

ALTER TABLE "parties_customers" ADD FOREIGN KEY ("id_host") REFERENCES "customer" ("id");

ALTER TABLE "friendship" ADD FOREIGN KEY ("id_customer") REFERENCES "customer" ("id");

ALTER TABLE "friendship" ADD FOREIGN KEY ("id_friend") REFERENCES "customer" ("id");

ALTER TABLE "message" ADD FOREIGN KEY ("id_thread") REFERENCES "thread" ("id");

ALTER TABLE "message" ADD FOREIGN KEY ("id_image") REFERENCES "image" ("id");

ALTER TABLE "bar" ADD FOREIGN KEY ("id_owner") REFERENCES "owner" ("id");
