from flask import Flask, Markup, render_template

app = Flask(__name__)


@app.route("/")
def index():
    return render_template('index.html', item='index')

@app.route('/demographics')
def demographics():
    return render_template('demographics.html', item='demographics')

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

@app.route('/data')
def data():
    return render_template('data.html', item='data')

@app.route('/map')
def map():
    return render_template('map-v2.html', text= "Judicial Districts Map", item='map')

if __name__ == "__main__":
    app.run(debug=True)