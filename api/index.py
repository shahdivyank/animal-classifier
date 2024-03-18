from flask import Flask, jsonify, request
from flask_cors import CORS
import base64
import cv2
import numpy as np
from tensorflow.keras.models import load_model
import numpy as np

model = load_model('./api/animals.keras')

# Classes
class_indices = {0: 'Bear', 1: 'Cat', 2: 'Cow', 3: 'Dog', 4: 'Eagle', 5:'Gorilla'}

app = Flask(__name__)
CORS(app)

@app.route("/api/classify", methods=['POST'])
def classify():
    base64_image = request.get_json()["image"].split(",")[1]
    decoded = base64.b64decode(base64_image)
    img_array = np.fromstring(decoded, np.uint8)
    img = cv2.imdecode(img_array, cv2.IMREAD_GRAYSCALE)
    img = cv2.resize(img, (150, 150))

    return jsonify(predict_image_class(img))

# Function to preprocess and predict the class of a new image
def predict_image_class(img_array):
    img_array = np.expand_dims(img_array, axis=0)
    img_array = img_array.astype(np.float64)
    img_array /= 255.

    print(img_array.shape)

    predictions = model.predict(img_array)
    predicted_class_index = np.argmax(predictions, axis=1)[0]

    data = class_indices[predicted_class_index]
    confidence = predictions[0][predicted_class_index] * 100

    return f"{data}_{confidence}"