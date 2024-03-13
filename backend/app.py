from flask import Flask, jsonify
from flask_cors import CORS
import time
app = Flask(__name__)
CORS(app)  # 允许跨域请求

app = Flask(__name__)

@app.route('/time')
def get_current_time():
    return {'time': time.time()}
