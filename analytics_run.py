from flask import Flask, request, render_template, jsonify
from analytics import get_most_visited

app = Flask(__name__)

@app.route("/analytics/common_popular", methods=["GET"])
def common_popular():
    return jsonify(get_most_visited())

@app.route("/analytics/personal_popular", methods=["GET", "POST"])
def personal_popular():
    mac =  request.args.get('macAdress')
    return jsonify(get_most_visited(mac))

@app.route("/analytics", methods=["GET"])
def root():
    return render_template('index.html')

if __name__ == "__main__":
    app.run(port=6000)
