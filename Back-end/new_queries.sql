-- First query with demographics filtered
select
	pa.age_bins,
	fr.court_name,
	fr.offense_category,
	fr.sentence_type
from 
	(select
		r.case_participant_id,
		max(court_name) court_name,
		o.offense_category,
		s.sentence_type
	from results r
	left join courts co
		on r.court_id = co.court_id
	left join offenses o
		on r.offense_id = o.offense_id
	left join sentences s
		on r.sentence_id = s.sentence_id
	group by (
		o.offense_category,
		s.sentence_type, 
		r.case_participant_id
	)) fr
left join participants pa
	on fr.case_participant_id = pa.case_participant_id;

-- Second query for the offense boxplot
select
	s.year,
	s.month,
	fr.offense_category,
	s.sentence_type,
	fr.court_name
from
	(select
	 	r.sentence_id,
	 	o.offense_category,
	 	co.court_name
	 from results r
	 left join courts co
	 	on r.court_id = co.court_id
	 left join offenses o
	 	on r.offense_id = o.offense_id
	 group by (
	 	r.sentence_id,
	 	o.offense_category,
	 	co.court_name
	)) fr
left join sentences s
	on s.sentence_id = fr.sentence_id
where s.month !=0;

-- Scatter for length of case
select
	fr.length_of_case_in_days,
	s.month,
	s.year,
	fr.offense_category,
	s.sentence_type
from 
	(select
	 	r.sentence_id,
	 	r.length_of_case_in_days,
	 	o.offense_category
	 from results r
	 left join offenses o
	 	on r.offense_id = o.offense_id
	 group by (
		r.sentence_id,
	 	r.length_of_case_in_days,
	 	o.offense_category
	 )) fr
left join sentences s
	on s.sentence_id = fr.sentence_id
where s.month !=0 
and fr.length_of_case_in_days != 0;


-- Boxplot for length of case
select
	fr.length_of_case_in_days,
	fr.offense_category,
	s.sentence_type,
	fr.court_name
from 
	(select
	 	r.sentence_id,
	 	r.length_of_case_in_days,
	 	o.offense_category,
	 	co.court_name
	 from results r
	 left join offenses o
	 	on r.offense_id = o.offense_id
	 left join courts co
	 	on r.court_id = co.court_id
	 group by (
		r.sentence_id,
	 	r.length_of_case_in_days,
	 	o.offense_category,
		co.court_name
	 )) fr
left join sentences s
	on s.sentence_id = fr.sentence_id
where fr.length_of_case_in_days != 0;

-- Multi-color barchart of courts
select
	fr.court_name,
	count(s.sentence_type) sentence_type,
	fr.offense_category
from (
	select
		co.court_name,
		o.offense_category,
		r.sentence_id
	from results r
		 left join offenses o
	 	on r.offense_id = o.offense_id
	 left join courts co
	 	on r.court_id = co.court_id
	 group by (
		co.court_name,
		o.offense_category,
		r.sentence_id
	 )) fr
left join sentences s
	on s.sentence_id = fr.sentence_id
group by 
	fr.court_name,
	fr.offense_category;

-- Scatter of courts
select
	count(fr.case_participant_id) participants,
	fr.age_at_incident,
	s.month,
	s.year,
	s.sentence_type,
	fr.court_name
from (
	select
		pa.case_participant_id,
		co.court_name,
		r.sentence_id,
		pa.age_at_incident
	from results r
		left join offenses o
	 		on r.offense_id = o.offense_id
		left join courts co
	 		on r.court_id = co.court_id
		left join participants pa
			on r.case_participant_id = pa.case_participant_id
	 group by (
		pa.case_participant_id,
		co.court_name,
		r.sentence_id,
		pa.age_at_incident
	 )) fr
left join sentences s
	on s.sentence_id = fr.sentence_id
group by 
	fr.age_at_incident,
	s.month,
	s.year,
	s.sentence_type,
	fr.court_name;

-- Multipie chart of offense
select
	r.case_id,
	o.offense_category,
	s.sentence_type,
	co.court_name
from results r
left join offenses o
	on r.offense_id = o.offense_id
left join courts co
	on r.court_id = co.court_id
left join sentences s
	on r.sentence_id = s.sentence_id
group by
	r.case_id,
	o.offense_category,
	s.sentence_type,
	co.court_name;