from flask import Flask, Markup, render_template

app = Flask(__name__)


@app.route("/")
def index():
    return render_template('index.html')

@app.route('/demographics')
def demographics():
    return render_template('demographics.html')


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