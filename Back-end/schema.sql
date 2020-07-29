-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- Link to schema: https://app.quickdatabasediagrams.com/#/d/y8XlYU
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


CREATE TABLE "participants" (
    "case_participant_id" bigint,
    "age_at_incident" integer,
    "gender" varchar,
    "race" varchar,
    "age_bins" varchar,
CONSTRAINT "pk_participants" PRIMARY KEY ("case_participant_id")
);

CREATE TABLE "courts" (
    "court_id" varchar,
    "court_facility" varchar,
    "court_name" varchar,
CONSTRAINT "pk_courts" PRIMARY KEY ("court_id")
);

CREATE TABLE "offenses" (
 "offense_id" integer,
 "offense_category" varchar,
 CONSTRAINT "pk_offenses" PRIMARY KEY (
 "offense_id"
 )
);

CREATE TABLE "sentences" (
    "sentence_id" integer,
    "sentence_type" varchar,
    "commitment_term" float,
    "commitment_unit" varchar,
    "month" float,
    "year" float,
 CONSTRAINT "pk_sentences" PRIMARY KEY ("sentence_id")
);

CREATE TABLE "results" (
    "case_participant_id" bigint,
    "court_id" varchar,
    "offense_id" integer,
    "sentence_id" integer,
    "case_id" bigint,
    "charge_disposition" varchar,
    "length_of_case_in_days" bigint,
    "disposition_charged_offense_title" varchar,
    "charge_count" integer,
    "disposition_charged_class" varchar,
    "sentence_date" date,
    "incident_begin_date" date,
    "arrest_date" date
);

ALTER TABLE "results" ADD CONSTRAINT "fk_results_case_participant_id" FOREIGN KEY("case_participant_id")
REFERENCES "participants" ("case_participant_id");

ALTER TABLE "results" ADD CONSTRAINT "fk_results_court_id" FOREIGN KEY("court_id")
REFERENCES "courts" ("court_id");

ALTER TABLE "results" ADD CONSTRAINT "fk_results_offense_id" FOREIGN KEY("offense_id")
REFERENCES "offenses" ("offense_id");

ALTER TABLE "results" ADD CONSTRAINT "fk_results_sentence_id" FOREIGN KEY("sentence_id")
REFERENCES "sentences" ("sentence_id");

