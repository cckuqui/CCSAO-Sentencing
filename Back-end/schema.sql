-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- Link to schema: https://app.quickdatabasediagrams.com/#/d/y8XlYU
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


CREATE TABLE "participants" (
    "case_participant_id" bigint   NOT NULL,
    "age_at_incident" integer   NOT NULL,
    "gender" varchar   NOT NULL,
    "race" varchar   NOT NULL,
    "age_bins" varchar   NOT NULL,
    CONSTRAINT "pk_participants" PRIMARY KEY (
        "case_participant_id"
     )
);

CREATE TABLE "courts" (
    "court_id" varchar   NOT NULL,
    "court_facility" varchar   NOT NULL,
    "court_name" varchar   NOT NULL,
    CONSTRAINT "pk_courts" PRIMARY KEY (
        "court_id"
     )
);

CREATE TABLE "offenses" (
    "offense_id" integer   NOT NULL,
    "offense_category" varchar   NOT NULL,
    CONSTRAINT "pk_offenses" PRIMARY KEY (
        "offense_id"
     )
);

CREATE TABLE "sentences" (
    "sentence_id" integer   NOT NULL,
    "sentence_type" varchar   NOT NULL,
    "commitment_term" float   NOT NULL,
    "commitment_unit" varchar   NOT NULL,
    "month" float   NOT NULL,
    "year" float   NOT NULL,
    CONSTRAINT "pk_sentences" PRIMARY KEY (
        "sentence_id"
     )
);

CREATE TABLE "results" (
    "case_participant_id" integer   NOT NULL,
    "court_id" varchar   NOT NULL,
    "offense_id" integer   NOT NULL,
    "sentence_id" integer   NOT NULL,
    "case_id" integer   NOT NULL,
    "primary_charge" boolean   NOT NULL,
    "charge_disposition" varchar   NOT NULL,
    "charge_id" integer   NOT NULL,
    "charge_version_id" integer   NOT NULL,
    "length_of_case_in_days" integer   NOT NULL
);

ALTER TABLE "results" ADD CONSTRAINT "fk_results_case_participant_id" FOREIGN KEY("case_participant_id")
REFERENCES "participants" ("case_participant_id");

ALTER TABLE "results" ADD CONSTRAINT "fk_results_court_id" FOREIGN KEY("court_id")
REFERENCES "courts" ("court_id");

ALTER TABLE "results" ADD CONSTRAINT "fk_results_offense_id" FOREIGN KEY("offense_id")
REFERENCES "offenses" ("offense_id");

ALTER TABLE "results" ADD CONSTRAINT "fk_results_sentence_id" FOREIGN KEY("sentence_id")
REFERENCES "sentences" ("sentence_id");

