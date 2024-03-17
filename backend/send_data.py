# server.py
from flask import Flask
from flask_socketio import SocketIO
from time import time

latLngArray = [
			"113.408984,23.174023",
			"113.406639,23.174023",
			"113.403944,23.173566",
			"113.400827,23.17394",
			"113.397468,23.174496",
			"113.391494,23.174513",
			"113.389032,23.174588",
			"113.388736,23.173217",
			"113.388511,23.171888",
			"113.388592,23.170501",
			"113.38861,23.170219",
			"113.38861,23.168342",
			"113.388574,23.165218"
		]
test_list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
app = Flask(__name__)
socket_io = SocketIO(app, cors_allowed_origins="*")

def send_data():
    i = 0 
    while i < len(test_list):
        socket_io.sleep(10)
        socket_io.emit('from-server', test_list[i] )
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

    socket_io.run(app, port=5000, debug=True)