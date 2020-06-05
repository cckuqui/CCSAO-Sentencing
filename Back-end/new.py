import pandas as pd
from sodapy import Socrata
import numpy as np
from password import key
from sqlalchemy import create_engine
  
# # Get information from Cook County Sentencing Data Database
 
# Call API
client = Socrata("datacatalog.cookcountyil.gov", None)

# Retrive Data
results = client.get("tg8v-tm6u", limit=300000)
 
# Generate DataFrame
original_data = pd.DataFrame.from_records(results)
 
# # Cleaning Process
    
# ## Select only chosen columns
 
# Copy only columns that we'll need for our analysis
data = original_data[['case_id','case_participant_id','charge_id','charge_version_id','court_facility','court_name','age_at_incident','gender','race','charge_disposition','length_of_case_in_days','current_sentence','primary_charge','sentence_date','offense_category','commitment_term','commitment_unit','sentence_type']]

# Delete conversion data from dataframe
data.replace(regex='PROMIS*',value=np.NaN, inplace=True)
  
# ## Drop NaN Values

data = data.dropna()
 
# ## Filter data after 2000 & before 2019

# Explore type of values in each column

# Create a copy of the Sentence Date to filter it
hdate = data['sentence_date']
data['date_year'] = hdate

# Select only the year
data['date_year'] = data['date_year'].replace(regex=['[0-9]*\/[0-9]*\/','\s[0-9]*\:[0-9]*\:[0-9]*\s[A-Z]*'], value='')

# Change value type
data['date_year'] = data['date_year'].astype(int)


# Filter year
data = data[(data.date_year > 1999) & (data.date_year < 2020)]

 
# ## Analize Offense Category and consolidate into related categories

# Consolidate Homicide category
data.offense_category = data.offense_category.replace(to_replace=['Attempt Homicide','Reckless Homicide'],value='Homicide')
 
# Consolidate Offense Against Police Officers category
data.offense_category = data.offense_category.replace(to_replace=['Aggravated Assault Police Officer','Aggravated Assault Police Officer Firearm','Police Shooting','Impersonating Police Officer'],value='Offense Against Police Officers')
 
# Consolidate Battery category
data.offense_category = data.offense_category.replace(to_replace=['Aggravated Battery','Aggravated Battery Police Officer','Aggravated Battery Police Officer Firearm','Aggravated Battery With A Firearm','Domestic Battery'],value='Battery')
 
# Consolidate Robbery, Burglery and Theft category
data.offense_category = data.offense_category.replace(to_replace=['Aggravated Identity Theft','Aggravated Robbery','Aggravated Robbery BB Gun','Armed Robbery','Attempt Armed Robbery','Burglary','Identity Theft','Residential Burglary','Retail Theft','Robbery','Theft','Theft by Deception','Possession Of Burglary Tools'],value='Robbery/Burglery/Theft')
 
# Consolidate Arson category
data.offense_category = data.offense_category.replace(to_replace=['Arson and Attempt Arson','Attempt Arson'],value='Arson')
 
# Consolidate Firearms and Explosives category
data.offense_category = data.offense_category.replace(to_replace=['Aggravated Discharge Firearm','Armed Violence','Disarming Police Officer','Gun Running','Possession of Explosives','UUW - Unlawful Use of Weapon','Gun - Non UUW','Bomb Threat','Reckless Discharge of Firearm'],value='Firearms and Explosives')
 
# Consolidate Motor Vehicles Offenses category
data.offense_category = data.offense_category.replace(to_replace=['Aggravated DUI','Attempt Vehicular Hijacking','DUI','Driving With Suspended Or Revoked License','Major Accidents','Possession of Stolen Motor Vehicle','Vehicular Hijacking','Vehicular Invasion'],value='Motor Vehicle Offenses')
 
# Consolidate Judicial Process Violations category
data.offense_category = data.offense_category.replace(to_replace=['Communicating With Witness','Escape - Failure to Return','Obstructing Justice','Perjury','Tampering','Violate Bail Bond','Violation Order Of Protection'],value='Judicial Process Violations')
 
# Consolidate Sex Offenses category
data.offense_category = data.offense_category.replace(to_replace=['Attempt Sex Crimes','Child Pornography','Failure to Register as a Sex Offender','Pandering','Prostitution','Sex Crimes','Violation of Sex Offender Registration'],value='Sex Offenses')
 
# Consolidate Human Trafficking, Detention and Kidnapping category
data.offense_category = data.offense_category.replace(to_replace=['Child Abduction','Human Trafficking','Kidnapping','Unlawful Restraint'],value='Human Trafficking/Detention/Kidnapping')
 
# Consolidate Trespassing category
data.offense_category = data.offense_category.replace(to_replace=['Home Invasion','Criminal Trespass To Residence'],value='Trespassing')
 
# Consolidate Fraud and Deception category
data.offense_category = data.offense_category.replace(to_replace=['Benefit Recipient Fraud','Credit Card Cases','Deceptive Practice','Forgery','Fraud','Fraudulent ID'],value='Fraud/Deception')
 
# Consolidate Corruption category
data.offense_category = data.offense_category.replace(to_replace=['Intimidation','Official Misconduct','Bribery'],value='Corruption')
 
# Consolidate Inside Penal Institutions category
data.offense_category = data.offense_category.replace(to_replace=['Possession of Contraband in Penal Institution','Possession of Shank in Penal Institution'],value='Inside Penal Institutions')
 
# Consolidate Other Offense category
data.offense_category = data.offense_category.replace(to_replace=['Dog Fighting','Gambling','Failure To Pay Child Support','Compelling Gang Membership'],value='Other Offense')
    
# ## Cleaning Race columns
 
 
# Consolidate Asian race
data.race = data.race.replace(to_replace='ASIAN',value='Asian')
 
# Consolidate Hispanic/Latino race
data.race = data.race.replace(to_replace=['White [Hispanic or Latino]','HISPANIC','White/Black [Hispanic or Latino]'],value='Hispanic/Latino')
    
# ## Cleaning Sentence Type

# Consolidate Probation & Supervision sentence
data.sentence_type = data.sentence_type.replace(to_replace=['Probation','2nd Chance Probation','Supervision','Probation Terminated Unsatisfactorily','Probation Terminated Instanter','Probation Terminated Satisfactorily'],value='Probation/Supervision')
 
# Consolidate Conditional sentence type
data.sentence_type = data.sentence_type.replace(to_replace='Conditional Release',value='Conditional Discharge')
 
# Consolidate Incarceration sentence
data.sentence_type = data.sentence_type.replace(to_replace=['Jail','Prison'],value='Incarceration')
    
# ## Cleaning Commitment Unit
 
# Unify Weight units
data.commitment_unit = data.commitment_unit.replace(to_replace=['Pounds','Kilos'],value='Weight')
 
# Clean all non-numeric characters and transform value type to float
data.commitment_term = data.commitment_term.replace(to_replace='two',value=2)
data.commitment_term = data.commitment_term.replace(regex=['[a-z]*','\,','\`'], value='')
data.commitment_term = data.commitment_term.astype('float')
 
# Change all years over 130 to 130 to mark natural life
data.loc[(data.commitment_unit == 'Year(s)') & (data.commitment_term > 129),['commitment_term']] = 130
 
# Changes in Bootcamp Terms to Months
data.loc[(data.sentence_type == 'Cook County Boot Camp') & (data.commitment_unit == 'Term') & (data.commitment_term == 1),['commitment_term']] = 12
data.loc[(data.sentence_type == 'Cook County Boot Camp') & (data.commitment_unit == 'Term') & (data.commitment_term == 12),['commitment_unit']] = 'Months'
data.loc[(data.sentence_type == 'Cook County Boot Camp') & (data.commitment_unit == 'Term') & (data.commitment_term == 18),['commitment_unit']] = 'Months'
 
# Change Death info to 130 years
data.loc[(data.sentence_type == 'Death'),['commitment_unit']] = 'Year(s)'
data.loc[(data.sentence_type == 'Death'),['commitment_term']] = 130
 
# Create column with all values in months
def month_convert(row):
    if row ['commitment_unit'] == 'Months':
        return round(float(row['commitment_term']),2)
    if row["commitment_unit"] == "Year(s)":
        return round(int(row["commitment_term"]) * 12.0, 2)
    if row["commitment_unit"] == "Weeks":
       return round(float(row['commitment_term']) / 4, 2)
    if row["commitment_unit"] == "Days":
        return round(float( row['commitment_term']) / 30, 2)
    if row['commitment_unit'] == "Natural Life":
        return 1560.
    else:
        return 0.

data['month'] = data.apply(lambda row:month_convert(row), axis = 1)
 
# Create column with all values in years
def year_convert(row):
    if row ['commitment_unit'] == 'Year(s)':
        return round(float(row['commitment_term']),2)
    if row["commitment_unit"] == "Months":
        return round(int(row["commitment_term"]) / 12.0, 2)
    if row["commitment_unit"] == "Weeks":
       return round(float(row['commitment_term']) / 52, 2)
    if row["commitment_unit"] == "Days":
        return round(float( row['commitment_term'])/365, 2)
    if row['commitment_unit'] == "Natural Life":
        return 130.
    else:
        return 0.

data['year'] = data.apply(lambda row:year_convert(row), axis = 1)
 
# Review new columns and changes
data[['commitment_unit', 'commitment_term','year','month']]
 
# Change age dtype from string to integer 
data.age_at_incident = data.age_at_incident.astype(int)
 
# Bins to group age
bins_ranges = [0,18,24,29,34,39,49,59,137]
bins_names = ["<18", '18-24', '25-29', '30-34', '35-39', '40s', '50s', '60+']

data['age_bins'] = pd.cut(data.age_at_incident,bins_ranges,labels=bins_names)
 
# Drop duplicates of data with current values
data.drop_duplicates(inplace=True)
data.reset_index(drop=True,inplace=True)
    
# ## Filter only current sentence

data = data.loc[data.current_sentence == True]
    
# # Analize new dataframe to create the database diagram

# # Create tables for SQL
participants = data[['case_participant_id','age_at_incident','gender','race','age_bins']].drop_duplicates()
 
courts = data[['court_facility', 'court_name']].drop_duplicates().reset_index(drop=True)
courts['court_id']=['1-26','6','2','5','4','3','1-4','1-DV','1-1','1-3','1-2','1-5','1-RJCC']
courts = courts[['court_id', 'court_facility', 'court_name']]
 
offenses = data[['offense_category']].drop_duplicates()
offenses = offenses.reset_index(drop=True)
offenses['offense_id'] = offenses.index + 1
offenses = offenses[['offense_id','offense_category']]
 
sentences = data[['sentence_type','commitment_term','commitment_unit','month', 'year']].drop_duplicates()
sentences = sentences.reset_index(drop=True)
sentences['sentence_id'] = sentences.index + 1
sentences = sentences[['sentence_id','sentence_type','commitment_term','commitment_unit','month', 'year']]

results = data.merge(sentences,on=['sentence_type','commitment_term','commitment_unit','month','year'])
results = results.merge(offenses,on='offense_category')
results = results.merge(courts,on=['court_facility','court_name'])
results = results[['case_id','sentence_id','offense_id','court_id','case_participant_id','charge_id','charge_version_id','charge_disposition','length_of_case_in_days','primary_charge']]
 
conn = f"postgres:{key}@localhost:5432/sentencing"
engine = create_engine(f'postgresql://{conn}')
 
# courts.to_sql(name='courts',con=engine,if_exists='append',index=False)
# participants.to_sql(name='participants',con=engine,if_exists='append',index=False)
# offenses.to_sql(name='offenses',con=engine,if_exists='append',index=False)
# sentences.to_sql(name='sentences',con=engine,if_exists='append',index=False)

results = results[['case_participant_id','court_id','offense_id','sentence_id','case_id','primary_charge','charge_disposition','charge_id','charge_version_id','length_of_case_in_days']]
# results.to_sql(name='results',con=engine,if_exists='append',index=False)
 

# # Queries from SQL for Graphs

 
import json


 
participants.to_json('../data/general_demographics.json',orient='records')


 
data[['case_participant_id','court_name','age_bins','offense_category','sentence_type']].drop_duplicates()


 
query1 = 'select 	pa.age_bins,     pa.gender,     pa.race, 	fr.court_name, 	fr.offense_category, 	fr.sentence_type from (     select 		r.case_participant_id, 		max(court_name) court_name, 		o.offense_category, 		s.sentence_type 	from results r 	left join courts co 		on r.court_id = co.court_id 	left join offenses o 		on r.offense_id = o.offense_id 	left join sentences s 		on r.sentence_id = s.sentence_id 	group by ( 		o.offense_category, 		s.sentence_type, 		r.case_participant_id 	)) fr left join participants pa 	on fr.case_participant_id = pa.case_participant_id;'


 
filtered_demographics = pd.read_sql_query(query1,con=engine)
filtered_demographics.to_json('../data/filtered_demographics.json',orient='records')


 
data[['year','month','offense_category','sentence_type','court_name']].loc[data.year != 0].drop_duplicates()


 
query2 = 'select	s.year, 	s.month, 	fr.offense_category, 	s.sentence_type, 	fr.court_name from 	(select 	 	r.sentence_id, 	 	o.offense_category, 	 	co.court_name 	 from results r 	 left join courts co 	 	on r.court_id = co.court_id 	 left join offenses o 	 	on r.offense_id = o.offense_id 	 group by ( 	 	r.sentence_id, 	 	o.offense_category, 	 	co.court_name 	)) fr left join sentences s 	on s.sentence_id = fr.sentence_id where s.month !=0;'


 
boxplot_offense = pd.read_sql_query(query2,con=engine)
boxplot_offense.to_json('../data/boxplot_offense.json',orient='records')


 
data[['length_of_case_in_days','month','year','offense_category','sentence_type']].loc[data.month != 0].drop_duplicates()


 
query3 = 'select 	fr.length_of_case_in_days, 	s.month, 	s.year, 	fr.offense_category, 	s.sentence_type from  	(select 	 	r.sentence_id, 	 	r.length_of_case_in_days, 	 	o.offense_category 	 from results r 	 left join offenses o 	 	on r.offense_id = o.offense_id 	 group by ( 		r.sentence_id, 	 	r.length_of_case_in_days, 	 	o.offense_category 	 )) fr left join sentences s 	on s.sentence_id = fr.sentence_id where s.month !=0 and fr.length_of_case_in_days != 0;'


 
scatter_length = pd.read_sql_query(query3, con=engine)
scatter_length.to_json('../data/scatter_length.json',orient='records')


 
query4 = 'select 	fr.length_of_case_in_days, 	s.month, 	s.year, 	fr.offense_category, 	s.sentence_type from  	(select 	 	r.sentence_id, 	 	r.length_of_case_in_days, 	 	o.offense_category 	 from results r 	 left join offenses o 	 	on r.offense_id = o.offense_id 	 group by ( 		r.sentence_id, 	 	r.length_of_case_in_days, 	 	o.offense_category 	 )) fr left join sentences s 	on s.sentence_id = fr.sentence_id where s.month !=0  and fr.length_of_case_in_days != 0;'


 
boxplot_length = pd.read_sql_query(query4, con=engine)
boxplot_length.to_json('../data/boxplot_length.json',orient='records')


 
query5 = 'select 	fr.court_name, 	count(s.sentence_type) sentence_type, 	fr.offense_category from ( 	select 		co.court_name, 		o.offense_category, 		r.sentence_id 	from results r 		 left join offenses o 	 	on r.offense_id = o.offense_id 	 left join courts co 	 	on r.court_id = co.court_id 	 group by ( 		co.court_name, 		o.offense_category, 		r.sentence_id 	 )) fr left join sentences s 	on s.sentence_id = fr.sentence_id group by  	fr.court_name, 	fr.offense_category;'


 
barchar_courts = pd.read_sql_query(query5, con=engine)
barchar_courts.to_json('../data/barchar_courts.json',orient='records')


 
query6 = 'select 	count(fr.case_participant_id) participants, 	fr.age_at_incident, 	s.month, 	s.year, 	s.sentence_type, 	fr.court_name from ( 	select 		pa.case_participant_id, 		co.court_name, 		r.sentence_id, 		pa.age_at_incident 	from results r 		left join offenses o 	 		on r.offense_id = o.offense_id 		left join courts co 	 		on r.court_id = co.court_id 		left join participants pa 			on r.case_participant_id = pa.case_participant_id 	 group by ( 		pa.case_participant_id, 		co.court_name, 		r.sentence_id, 		pa.age_at_incident 	 )) fr left join sentences s 	on s.sentence_id = fr.sentence_id group by  	fr.age_at_incident, 	s.month, 	s.year, 	s.sentence_type, 	fr.court_name;' 


 
scatter_courts = pd.read_sql_query(query6, con=engine)
scatter_courts.to_json('../data/scatter_courts.json',orient='records')


 
data[['case_id','offense_category','sentence_type','court_name']].drop_duplicates()


 
query7 = 'select 	r.case_id, 	o.offense_category, 	s.sentence_type, 	co.court_name from results r left join offenses o 	on r.offense_id = o.offense_id left join courts co 	on r.court_id = co.court_id left join sentences s 	on r.sentence_id = s.sentence_id group by 	r.case_id, 	o.offense_category, 	s.sentence_type, 	co.court_name;'


 
pie_offense = pd.read_sql_query(query7, con=engine)
pie_offense.to_json('../data/pie_offense.json',orient='records')


