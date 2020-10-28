CREATE DATABASE prost;

CREATE TABLE "customer" (
  "id" SERIAL PRIMARY KEY,
  "first_name" varchar,
  "last_name" varchar,
  "user_name" varchar,
  "id_facebook" int,
  "id_google" int,
);

CREATE TABLE "owner" (
  "id" SERIAL PRIMARY KEY,
  "first_name" varchar,
  "last_name" varchar,
  "user_name" varchar,
  "password" varchar,
  "id_facebook" int,
  "id_google" int,
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

CREATE TABLE "relationship" (
  "id" SERIAL PRIMARY KEY,
  "id_follower" int,
  "id_following" int,
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

ALTER TABLE "relationship" ADD FOREIGN KEY ("id_follower") REFERENCES "customer" ("id");

ALTER TABLE "relationship" ADD FOREIGN KEY ("id_following") REFERENCES "customer" ("id");

ALTER TABLE "message" ADD FOREIGN KEY ("id_thread") REFERENCES "thread" ("id");

ALTER TABLE "message" ADD FOREIGN KEY ("id_image") REFERENCES "image" ("id");

ALTER TABLE "bar" ADD FOREIGN KEY ("id_owner") REFERENCES "owner" ("id");
