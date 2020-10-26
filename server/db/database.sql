CREATE DATABASE prost;

CREATE TABLE "customers" (
  "id" SERIAL PRIMARY KEY,
  "first_name" varchar,
  "last_name" varchar,
  "user_name" varchar,
  "facebookId" int,
  "googleId" int,
  "created_at" timestamp,
);

CREATE TABLE "owners" (
  "id" SERIAL PRIMARY KEY,
  "first_name" varchar,
  "last_name" varchar,
  "user_name" varchar,
  "password" varchar,
  "facebookId" int,
  "googleId" int,
  "created_at" timestamp
);

CREATE TABLE "eContacts" (
  "id" SERIAL PRIMARY KEY,
  "id_customers" int,
  "first_name" varchar,
  "last_name" varchar,
  "phone_number" int,
  "qrcode" varchar,
  "email" varchar,
  "created_at" timestamp
);

CREATE TABLE "bars" (
  "id" SERIAL PRIMARY KEY,
  "bar_name" varchar,
  "phone_number" int,
  "address" varchar,
  "id_owners" int,
  "created_at" timestamp,
  "qrcode" varchar,
);

CREATE TABLE "menus" (
  "id" SERIAL PRIMARY KEY,
  "created_at" timestamp,
  "id_bar" int,
);

CREATE TABLE "parties" (
  "id" SERIAL PRIMARY KEY,
  "id_bars" int,
  "size" int,
  "created_at" timestamp
);

CREATE TABLE "relationships" (
  "id" SERIAL PRIMARY KEY,
  "id_followers" int,
  "id_following" int,
  "created_at" timestamp
);

CREATE TABLE "messages" (
  "id" SERIAL PRIMARY KEY,
  "body" varchar,
  "id_images" int,
  "created_at" timestamp,
  "id_threads" int
);

CREATE TABLE "threads" (
  "id" SERIAL PRIMARY KEY,
  "created_at" timestamp,
);

CREATE TABLE "images" (
  "id" SERIAL PRIMARY KEY,
  "image" varchar,
  "id_customers" int,
  "id_bars" int,
  "created_at" timestamp,
);


CREATE TABLE "messages_customers" (
  "id" SERIAL PRIMARY KEY,
  "id_customers" int,
  "id_messages" int,
  "created_at" timestamp
);

CREATE TABLE "customers_bars" (
  "id" SERIAL PRIMARY KEY,
  "id_customers" int,
  "id_bars" int,
  "created_at" timestamp
);

CREATE TABLE "parties_customers" (
  "id" SERIAL PRIMARY KEY,
  "id_customers" int,
  "id_host" int,
  "id_parties" int,
  "created_at" timestamp
);

ALTER TABLE "eContacts" ADD FOREIGN KEY ("id_customers") REFERENCES "customers" ("id");

ALTER TABLE "menus" ADD FOREIGN KEY ("id_bars") REFERENCES "bar" ("id");

ALTER TABLE "images" ADD FOREIGN KEY ("id_customers") REFERENCES "customers" ("id");

ALTER TABLE "images" ADD FOREIGN KEY ("id_bars") REFERENCES "bars" ("id");

ALTER TABLE "customers_bars" ADD FOREIGN KEY ("id_customers") REFERENCES "customers" ("id");

ALTER TABLE "customers_bars" ADD FOREIGN KEY ("id_bars") REFERENCES "bars" ("id");

ALTER TABLE "parties" ADD FOREIGN KEY ("id_bars") REFERENCES "bars" ("id");

ALTER TABLE "parties_customers" ADD FOREIGN KEY ("id_parties") REFERENCES "parties" ("id");

ALTER TABLE "parties_customers" ADD FOREIGN KEY ("id_customers") REFERENCES "customers" ("id");

ALTER TABLE "parties_customers" ADD FOREIGN KEY ("id_host") REFERENCES "customers" ("id");

ALTER TABLE "relationships" ADD FOREIGN KEY ("id_followers") REFERENCES "customers" ("id");

ALTER TABLE "relationships" ADD FOREIGN KEY ("id_following") REFERENCES "customers" ("id");

ALTER TABLE "messages_customers" ADD FOREIGN KEY ("id_customers") REFERENCES "customers" ("id");

ALTER TABLE "messages_customers" ADD FOREIGN KEY ("id_messages") REFERENCES "messages" ("id");

ALTER TABLE "messages" ADD FOREIGN KEY ("id_threads") REFERENCES "threads" ("id");

ALTER TABLE "messages" ADD FOREIGN KEY ("id_images") REFERENCES "images" ("id");

ALTER TABLE "bars" ADD FOREIGN KEY ("id_owners") REFERENCES "owners" ("id");
