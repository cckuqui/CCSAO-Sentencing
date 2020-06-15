from flask import Flask, Markup, render_template, jsonify
from password import key
from sqlalchemy import create_engine
from sqlalchemy.orm import Session
import pandas as pd
import queries


app = Flask(__name__)
conn = f"postgres:{key}@localhost:5432/sentencing"
engine = create_engine(f'postgresql://{conn}')
session = Session(bind=engine)

@app.route("/")
def index():
    return render_template('index.html', item='index')

@app.route('/demographics')
def demographics():
    return render_template('demographics.html', item='demographics')

@app.route("/demographics/data")
def data():
	demographics = pd.read_sql_query(queries.simp_demo, con=engine)
	
	return demographics.to_json(orient='records')


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