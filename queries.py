demographics = """
select * from participants;
"""

courts_data = """
select
    re.case_id, 
    of.offense_category, 
    se.sentence_type, 
    co.court_name 
from results re
left join offenses of
    on re.offense_id = of.offense_id
left join sentences se
    on re.sentence_id = se.sentence_id
left join courts co
    on re.court_id = co.court_id;
"""

length_scatter = """
select
    re.length_of_case_in_days, 
    se.month, 
    se.year, 
    of.offense_category, 
    se.sentence_type
from results re
left join offenses of
    on re.offense_id = of.offense_id
left join sentences se
    on re.sentence_id = se.sentence_id;
"""

offense_box = """
select
    re.length_of_case_in_days, 
    of.offense_category 
from results re
left join offenses of
    on re.offense_id = of.offense_id;
"""

age_box = """
select
    pa.age_at_incident, 
    of.offense_category 
from results re
left join offenses of
    on re.offense_id = of.offense_id
left join participants pa
    on re.case_participant_id = pa.case_participant_id;
"""