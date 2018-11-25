import mysql.connector
from collections import Counter

def get_data(mac_address=None):
    mydb = mysql.connector.connect(
              host="localhost",
              user="server",
              passwd="beats",
              database="beasts"
            )
    cursor = mydb.cursor()
    query = "SELECT x, y FROM location_events"
    if mac_address:
        query += " WHERE clientMac = '" + mac_address + "'"
    cursor.execute(query)
    data = cursor.fetchall()
    return data

def get_clusters(location_data):
    clusters = [(round(x, -1), round(y, -1)) for x, y in location_data]
    cnt = Counter(clusters)
    return cnt

def get_least_visited(mac_address=None):
    return get_clusters(get_data(mac_address)).most_common()[-1]

def get_most_visited(mac_address=None):
    return make_list(get_clusters(get_data(mac_address)).most_common()[:5])

def rotate(x, y):
    return [0.8 * x - 0.6 * y, 0.6 * x + 0.8 * y]

def make_list(list_of_tuples):
    return [[[coord[0], coord[1]], freq] for coord, freq in list_of_tuples]

def get_recommendation(mac_address):
    x, y = list(get_least_visited(mac_address)[0])
    return rotate(x, y)
