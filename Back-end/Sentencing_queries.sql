--For the dempgraphics graphs
SELECT participants.age_at_incident, participants.gender, participants.race, participants.age_bins, courts.court_name, offenses.offense_category, sentences.sentence_type
FROM participants
LEFT JOIN results ON participants.case_participant_id = results.case_participant_id
LEFT JOIN courts ON results.court_id = courts.court_id
RIGHT JOIN offenses ON results.offense_id = offenses.offense_id
JOIN sentences ON results.sentence_id = sentences.sentence_id
ORDER BY age_at_incident ASC;

-- For the Boxplots on the Landing page/Dashboard
-- We may have to run similar but separate queries split by sentence_type (because of the differences in committment unit)
-- ALSO, THERE ARE NOVALUES FOR CC BOOTCAMP IN THE SENTENCES TABLE, THEY DID NOT EXPORT FROM PANDAS
    -- SELECT * FROM sentences
    -- WHERE sentence_type = 'Cook County Bootcamp';
SELECT sentences.committment_term, sentences.commitment_unit, sentences.sentence_type, offenses.offense_category, courts.court_name
FROM results
LEFT JOIN sentences ON results.sentence_id = sentences.sentence_id
LEFT JOIN courts ON results.court_id = courts.court_id
LEFT JOIN offenses ON results.offense_id = offenses.offense_id
ORDER BY commitment_unit ASC;

-- for the 2 graphs (1 scatter, 1 boxpolt series) involving length of case in days
-- Again, we may have to run similar but separate queries split by sentence_type (because of the differences in committment unit)
SELECT cases.length_of_case_in_days, sentences.committment_term, sentences.commitment_unit, sentences.sentence_type, offenses.offense_category, participants.age_bins, courts.court_name
FROM results
LEFT JOIN cases on results.case_id = cases.case_id
LEFT JOIN sentences ON results.sentence_id = sentences.sentence_id
LEFT JOIN offenses ON results.offense_id = offenses.offense_id
LEFT JOIN participants ON results.participant_id = participants.participant_id
LEFT JOIN courts ON results.court_id = courts.court_id
ORDER BY length_of_case_in_days ASC;

-- For courts multicolor bar chart
-- should do the count (var length) in JS to plot the counts of each category on the bar chart
SELECT court.court_name, courts.court_facility, sentences.sentence_type, offenses.offense_category
FROM results
LEFT JOIN courts ON results.court_id = courts.court_id
LEFT JOIN sentences ON results.sentence_id = sentences.sentence_id
LEFT JOIN offenses ON results.offense_id = offenses.offense_id
GROUP BY court_name
ORDER BY court_name ASC;

-- For Age at incident scatter graph
SELECT participants.age_at_incident, sentences.committment_term, sentences.commitment_unit, sentences.sentence_type, courts.court_name, courts.court_facility
FROM results
LEFT JOIN participants ON results.participant_id = participants.participant_id
LEFT JOIN sentences ON results.sentence_id = sentences.sentence_id
LEFT JOIN courts ON results.court_id = courts.court_id
ORDER BY age_at_incident ASC;

-- For multilevel pie chart on offense categories
SELECT courts.court_name, courts.court_facility, sentences.sentence_type, offenses.offense_category
FROM results
LEFT JOIN courts ON results.court_id = courts.court_id
LEFT JOIN sentences ON results.sentence_id = sentences.sentence_id
LEFT JOIN offenses ON results.offense_id = offenses.offense_id
GROUP BY court_name
ORDER BY court_name ASC;





