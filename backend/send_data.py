# server.py

from flask import Flask, render_template
from flask_socketio import SocketIO
from time import time

app = Flask(__name__)
socket_io = SocketIO(app, cors_allowed_origins="*")

@socket_io.on('connect')
def handle_connect():
    print('new connection')

@socket_io.on('to-server')
def handle_to_server(arg):
    print(f'new to-server event: {arg}')
    
    socket_io.emit('from-server', str(time()))

if __name__ == '__main__':
    socket_io.run(app, port=5000)