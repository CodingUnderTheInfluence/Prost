CREATE DATABASE prost;

CREATE TABLE "customer" (
  "id" SERIAL PRIMARY KEY,
  "first_name" varchar,
  "last_name" varchar,
  "user_name" varchar,
  "facebookId" int,
  "googleId" int,
  "created_at" timestamp,
);

CREATE TABLE "owner" (
  "id" SERIAL PRIMARY KEY,
  "first_name" varchar,
  "last_name" varchar,
  "user_name" varchar,
  "password" varchar,
  "facebookId" int,
  "googleId" int,
  "created_at" timestamp
);

CREATE TABLE "eContact" (
  "id" SERIAL PRIMARY KEY,
  "id_customer" int,
  "first_name" varchar,
  "last_name" varchar,
  "phone_number" varchar,
  "qrcode" varchar,
  "email" varchar,
  "created_at" timestamp
);

CREATE TABLE "bar" (
  "id" SERIAL PRIMARY KEY,
  "bar_name" varchar,
  "phone_number" varchar,
  "address" varchar,
  "id_owner" int,
  "qrcode" varchar,
  "created_at" timestamp,
);

CREATE TABLE "menu" (
  "id" SERIAL PRIMARY KEY,
  "image" varchar,
  "created_at" timestamp,
  "id_bar" int,
);

CREATE TABLE "party" (
  "id" SERIAL PRIMARY KEY,
  "id_bar" int,
  "size" int,
  "created_at" timestamp
);

CREATE TABLE "relationship" (
  "id" SERIAL PRIMARY KEY,
  "id_follower" int,
  "id_following" int,
  "created_at" timestamp
);

CREATE TABLE "message" (
  "id" SERIAL PRIMARY KEY,
  "body" varchar,
  "id_customer" int,
  "id_thread" int,
  "created_at" timestamp,
);

CREATE TABLE "thread" (
  "id" SERIAL PRIMARY KEY,
  "created_at" timestamp,
);

CREATE TABLE "image" (
  "id" SERIAL PRIMARY KEY,
  "image" varchar,
  "id_customer" int,
  "id_bar" int,
  "id_message" int,
  "created_at" timestamp,
);


CREATE TABLE "customers_bars" (
  "id" SERIAL PRIMARY KEY,
  "id_customer" int,
  "id_bar" int,
  "created_at" timestamp
);

CREATE TABLE "parties_customers" (
  "id" SERIAL PRIMARY KEY,
  "id_customer" int,
  "id_host" int,
  "id_party" int,
  "created_at" timestamp
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
