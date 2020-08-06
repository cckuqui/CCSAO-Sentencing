from flask import Flask, Markup, render_template, jsonify
import pandas as pd
import sqlite3
import queries


app = Flask(__name__)
conn = sqlite3.connect("ETL-backend/sentencing.db")

@app.route("/")
def index():
    return render_template('index.html', item='index')

@app.route('/demographics')
def demographics():
    return render_template('demographics.html', item='demographics')

@app.route("/demographics/data")
def demographics_data():
    demographics = pd.read_sql_query(queries.demographics, con=conn)

    return demographics.to_json(orient='records')


@app.route('/offense_category')
def offense_category():
    return render_template('offense_category.html', item='offense_category')

@app.route('/length_of_case')
def length_of_case():
    return render_template('length_of_case.html', item='length_of_case')

@app.route("/length_of_case/scatter")
def length_scatter():
    lenght_scatter_df = pd.read_sql_query(queries.length_scatter, con=conn)

    return lenght_scatter_df.to_json(orient='records')

@app.route("/length_of_case/box")
def length_box():
    lenght_box_df = pd.read_sql_query(queries.offense_box, con=conn)

    return lenght_box_df.to_json(orient='records')

@app.route('/courts')
def courts():
    return render_template('courts.html', item='courts')

@app.route("/courts/data")
def courts_data():
    courts_df = pd.read_sql_query(queries.courts_data, con=conn)

    return courts_df.to_json(orient='records')

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