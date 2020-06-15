filt_demo = 'select \
	pa.age_bins, \
    pa.gender, \
    pa.race, \
    from ( \
    select \
		r.case_participant_id, \
		max(court_name) court_name, \
		o.offense_category, \
		s.sentence_type \
	from results r \
	left join courts co \
		on r.court_id = co.court_id \
	left join offenses o \
		on r.offense_id = o.offense_id \
	left join sentences s \
		on r.sentence_id = s.sentence_id \
	group by ( \
		o.offense_category, \
		s.sentence_type, \
		r.case_participant_id \
	)) fr \
    left join participants pa \
	on fr.case_participant_id = pa.case_participant_id \
    where \
        fr.court_name == {court} \
	    fr.offense_category == {offense} \
	    fr.sentence_type == {sentence};'

simp_demo = 'select * from participants'