-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


CREATE TABLE "participant" (
    "case_participant_id" integer   NOT NULL,
    "age_at_incident" integer   NOT NULL,
    "gender" varchar   NOT NULL,
    "race" varchar   NOT NULL,
    CONSTRAINT "pk_participant" PRIMARY KEY (
        "case_participant_id"
     )
);

CREATE TABLE "court" (
    "court_id" integer   NOT NULL,
    "court_facility" varchar   NOT NULL,
    "court_name" varchar   NOT NULL,
    CONSTRAINT "pk_court" PRIMARY KEY (
        "court_id"
     )
);

CREATE TABLE "case" (
    "case_id" integer   NOT NULL,
    "court_id" integer   NOT NULL,
    "case_participant_id" integer   NOT NULL,
    "length_of_case_in_days" integer   NOT NULL,
    CONSTRAINT "pk_case" PRIMARY KEY (
        "case_id"
     )
);

CREATE TABLE "offense" (
    "offense_id" integer   NOT NULL,
    "case_participant_id" integer   NOT NULL,
    "case_id" integer   NOT NULL,
    "offense_category" varchar   NOT NULL,
    "charge_disposition" varchar   NOT NULL,
    "primary_charge" boolean   NOT NULL,
    "charge_id" list   NOT NULL,
    "charge_version_id" list   NOT NULL,
    CONSTRAINT "pk_offense" PRIMARY KEY (
        "offense_id"
     )
);

CREATE TABLE "sentence" (
    "case_participant_id" integer   NOT NULL,
    "offense_id" integer   NOT NULL,
    "sentence_type" varchar   NOT NULL,
    "commitment_term" float   NOT NULL,
    "commitment_unit" varchar   NOT NULL,
    "month" float   NOT NULL,
    "year" float   NOT NULL
);

ALTER TABLE "case" ADD CONSTRAINT "fk_case_court_id" FOREIGN KEY("court_id")
REFERENCES "court" ("court_id");

ALTER TABLE "case" ADD CONSTRAINT "fk_case_case_participant_id" FOREIGN KEY("case_participant_id")
REFERENCES "participant" ("case_participant_id");

ALTER TABLE "offense" ADD CONSTRAINT "fk_offense_case_participant_id" FOREIGN KEY("case_participant_id")
REFERENCES "participant" ("case_participant_id");

ALTER TABLE "offense" ADD CONSTRAINT "fk_offense_case_id" FOREIGN KEY("case_id")
REFERENCES "case" ("case_id");

ALTER TABLE "sentence" ADD CONSTRAINT "fk_sentence_case_participant_id" FOREIGN KEY("case_participant_id")
REFERENCES "participant" ("case_participant_id");

ALTER TABLE "sentence" ADD CONSTRAINT "fk_sentence_offense_id" FOREIGN KEY("offense_id")
REFERENCES "offense" ("offense_id");

