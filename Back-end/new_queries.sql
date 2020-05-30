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
