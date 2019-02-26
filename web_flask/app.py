#!/usr/bin/python3
"""
starts a Flask web app
"""
from flask import Flask, render_template
import os

# Global Flask Application Variable: app
#app = Flask(__name__)
application = Flask(__name__)
application.url_map.strict_slashes = False

@application.route('/')
def index():
    """Display log in page"""
    return render_template('landing/index.html')


@application.route('/unitube/')
def show_video():
    """Display page with prompt for YouTube video ID"""
    return render_template('main/index.html')

if __name__ == '__main__':
    application.run(host='0.0.0.0', port=5000)
