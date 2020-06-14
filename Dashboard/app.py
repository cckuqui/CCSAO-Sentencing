from flask import Flask, Markup, render_template
import sqlalchemy
from flask import Flask, jsonify
import pandas

app = Flask(__name__)


@app.route("/")
def index():
    return render_template('index.html', item='index')

@app.route('/demographics')
def demographics():
    conn = f"postgres:{key}@localhost:5432/sentencing"
    engine = create_engine(f'postgresql://{conn}')

    session = Session(bind=engine)

    query1 = 'select \
	pa.age_bins, \
    pa.gender, \
    pa.race, \
	fr.court_name, \
	fr.offense_category, \
	fr.sentence_type \
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
	on fr.case_participant_id = pa.case_participant_id;'

    filtered_demographics = pd.read_sql_query(query1,con=engine)

    return jsonify(filtered_demographics)
    # return render_template('demographics.html', item='demographics')

# def line():
#     line_labels=labels
#     line_values=values
#     return render_template('demographics.html', title='Bitcoin Monthly Price in USD', max=17000, labels=line_labels, values=line_values)

@app.route('/offense_category')
def offense_category():
    return render_template('offense_category.html', item='offense_category')

@app.route('/length_of_case')
def length_of_case():
    return render_template('length_of_case.html', item='length_of_case')

@app.route('/courts')
def courts():
    return render_template('courts.html', item='courts')

@app.route('/about')
def about():
    return render_template('about.html', item='about')

# @app.route('/data')
# def data():
#     return render_template('data.html', item='data')

@app.route('/map')
def map():
    return render_template('map-v2.html', text= "Judicial Districts Map", item='map')

if __name__ == "__main__":
    app.run(debug=True)