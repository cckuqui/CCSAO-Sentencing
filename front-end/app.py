from flask import Flask, Markup, render_template

app = Flask(__name__)

labels = [
    'JAN', 'FEB', 'MAR', 'APR',
    'MAY', 'JUN', 'JUL', 'AUG',
    'SEP', 'OCT', 'NOV', 'DEC'
]

values = [
    967.67, 1190.89, 1079.75, 1349.19,
    2328.91, 2504.28, 2873.83, 4764.87,
    4349.29, 6458.30, 9907, 16297
]

colors = [
    "#F7464A", "#46BFBD", "#FDB45C", "#FEDCBA",
    "#ABCDEF", "#DDDDDD", "#ABCABC", "#4169E1",
    "#C71585", "#FF4500", "#FEDCBA", "#46BFBD"]


@app.route("/")
def index():
    bar_labels=labels
    bar_values=values
    return render_template('index.html', chart_title='Bitcoin Monthly Price in USD', max=17000, labels=bar_labels, values=bar_values)

@app.route('/demographics')
def demographics():
    return render_template('demographics.html')

def line():
    line_labels=labels
    line_values=values
    return render_template('demographics.html', title='Bitcoin Monthly Price in USD', max=17000, labels=line_labels, values=line_values)

@app.route('/offense_category')
def offense_category():
    return render_template('offense_category.html')

@app.route('/length_of_case')
def length_of_case():
    return render_template('length_of_case.html')

@app.route('/courts')
def courts():
    return render_template('courts.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/data')
def data():
    return render_template('data.html')

@app.route('/map')
def map():
    return render_template('map.html', text= "Judicial Districts Map")

if __name__ == "__main__":
    app.run(debug=True)