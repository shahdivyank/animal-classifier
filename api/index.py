from flask import Flask, jsonify, request
from flask_cors import CORS
import base64
import cv2
import numpy as np

app = Flask(__name__)
CORS(app)

@app.route("/api/classify", methods=['POST'])
def classify():
    base64_image = request.get_json()["image"].split(",")[1]
    decoded = base64.b64decode(base64_image)
    img_array = np.fromstring(decoded, np.uint8)
    img = cv2.imdecode(img_array, cv2.IMREAD_UNCHANGED)

    print(img)
    
    return jsonify("Tiger")