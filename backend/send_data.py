# server.py
from flask import Flask
from flask_socketio import SocketIO
from time import time

latLngArray = [
    "39.898457,116.391844",
    "39.898595,116.377947",
    "39.898341,116.368001",
    "39.898063,116.357144",
    "39.899095,116.351934",
    "39.905871,116.350670",
    "39.922329,116.349800",
    "39.931017,116.349671",
    "39.939104,116.349225",
    "39.942233,116.349910",
    "39.947263,116.366892",
    "39.947568,116.387537",
    "39.947764,116.401988",
    "39.947929,116.410824",
    "39.947558,116.426740",
    "39.939700,116.427338",
    "39.932404,116.427919",
    "39.923109,116.428377",
    "39.907094,116.429583",
    "39.906858,116.414040",
    "39.906622,116.405321",
    "39.906324,116.394954",
    "39.906308,116.391264",
    "39.916611,116.390748"
]

test_list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
app = Flask(__name__)
socket_io = SocketIO(app, cors_allowed_origins="*")

def send_data():
    i = 0 
    while i < len(latLngArray):
        socket_io.sleep(0.3)
        socket_io.emit('from-server', latLngArray[i] )
        i += 1  

@socket_io.on('connect')
def handle_connect():
    print('new connection')
    socket_io.start_background_task(send_data)

@socket_io.on('to-server')
def handle_to_server(arg):
    print(f'new to-server event: {arg}')
    socket_io.emit('from-server', send_data())
#
if __name__ == '__main__':

    socket_io.run(app, port=50000, debug=True)