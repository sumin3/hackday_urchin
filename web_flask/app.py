#!/usr/bin/python3
"""
starts a Flask web app
"""
from flask import Flask, render_template
import os

# Global Flask Application Variable: app
app = Flask(__name__)
app.url_map.strict_slashes = False

@app.route('/')
def index():
    """Display log in page"""
    # testing that environment variables can be captured and passed to html
    thing = os.getenv('THING')
    return render_template('/landing/index.html', thing=thing)


@app.route('/unitube/<video_id>')
def show_video():
    """Display page with prompt for YouTube video ID"""
    return render_template('/main/index.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
