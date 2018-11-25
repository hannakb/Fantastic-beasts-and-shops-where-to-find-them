from flask import Flask, request, jsonify
from flaskext.mysql import MySQL
import json

app = Flask(__name__)
 
mysql = MySQL()
app.config['MYSQL_DATABASE_USER'] = 'server'
app.config['MYSQL_DATABASE_PASSWORD'] = 'beats'
app.config['MYSQL_DATABASE_DB'] = 'beasts'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
mysql.init_app(app)

@app.route("/", methods=['GET'])
def get():
    return "ac8b63a1c41e75a214b6693a370ba4615962fce2";


@app.route("/", methods=['POST'])
def post_req():
    print "!!!!!!!! get !!!!!!!!!";
    # print request.json
    data = request.json['data'];
    # print data['data']['observations'];
    conn = mysql.connect()
    cursor = conn.cursor()
    
    # cursor.execute("INSERT INTO location_events VALUES (\'"+clientMac+"\',"+seenTime+","+x+","+y+","+lat+","+lng+","+unc")");
    for obs in  data['observations']:
        for i in range(len(obs['location']['x'])):
            # print obs
            clientMac = obs['clientMac']
            seenTime = obs['seenTime']
            x = obs['location']['x'][i]
            y = obs['location']['y'][i]
            lat = obs['location']['lat']
            lng = obs['location']['lng']
            unc = obs['location']['unc']
            cursor.execute("INSERT INTO location_events VALUES (\'"+clientMac+"\',\'"+seenTime+"\',"+str(x)+","+str(y)+","+str(lat)+","+str(lng)+","+str(unc)+")");
            conn.commit()
    return "";
      
#@app.route("/analytics/<mac_address>", methods=['POST'])
#def get_location_by_max(mac_address):
#    cursor = mysql.connect().cursor()
#    cursor.execute("SELECT x, y FROM location_events WHERE clientMac = '" + mac_address + "'")
#    data = cursor.fetchone()
#    return data


@app.route("/personal_section_rec", methods=["GET"])
def personal_rec():
    clientMac = request.json['clientMac']
    return jsonify(get_recomendation(clientMac))

if __name__ == "__main__":
    app.run()
