from flask import Flask, Markup, render_template, jsonify
from password import key
import pandas as pd
import sqlite3


app = Flask(__name__)
conn = sqlite3.connect("sentencing.db")

@app.route("/")
def index():
    return render_template('index.html', item='index')

@app.route('/demographics')
def demographics():
    return render_template('demographics.html', item='demographics')

@app.route("/demographics/data")
def data():
    demo = """select * from participants;"""
    demographics = pd.read_sql_query(demo, con=conn)

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