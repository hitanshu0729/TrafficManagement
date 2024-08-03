# get gps coordinates from geopy
import json

# import urlopen from urllib.request
from urllib.request import urlopen

# open following url to get ipaddress
urlopen("http://ipinfo.io/json")

# load data into array
data = json.load(urlopen("http://ipinfo.io/json"))

# extract lattitude
lat = data['loc'].split(',')[0]

# extract longitude
lon = data['loc'].split(',')[1]

print(lat, lon)

import json
import cv2
from urllib.request import urlopen
from ultralytics import YOLO
import supervision as sv
from ultralytics.utils.plotting import Annotator
import time
import cvzone
import firebase_admin
from firebase_admin import db
from firebase_admin import credentials

cred = credentials.Certificate("facerecognition-a185f-firebase-adminsdk-88h36-3345fd9d69.json")
firebase_admin.initialize_app(cred, {
    'databaseURL': "https://facerecognition-a185f-default-rtdb.firebaseio.com/"
})

ref = firebase_admin.db.reference('Parking')

VIDEOPATH = r"C:\Users\PRATAP\Downloads\videoplayback (1).mp4"

parking_detector = YOLO('yolov8n.pt')
parking_detector = YOLO('parking.pt')

video = cv2.VideoCapture(VIDEOPATH)

classes = ['free', 'occupied']
prev = time.time()

while True:
    ret, frame = video.read()

    if not ret:
        continue

    annotator = Annotator(frame)
    parking_slots_detection = parking_detector.predict(frame, conf=0.05, vid_stride=10)
    parking_slot_count = {class_name: 0 for class_name in classes}

    for result in parking_slots_detection:
        boxes = result.boxes.cpu().numpy()

        for box in boxes:99
            (x, y, w, h) = box.xyxy[0]
            b = box.xyxy[0].astype(int)
            c = int(box.cls[0])
            class_names = parking_detector.model.names[int(c)]

    y_pos = 50

    data = {"vehiclecount": {class_name: parking_slot_count[class_name]+1 for class_name in classes}, "location": [lat, lon]}
    ref.child("location1").set(data)

    cv2.imshow("Parking", frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

video.release()
cv2.destroyAllWindows()
