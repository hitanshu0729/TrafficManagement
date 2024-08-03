from ultralytics import YOLO
import cv2

import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

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

cred = credentials.Certificate("facerecognition-a185f-firebase-adminsdk-88h36-3345fd9d69.json")
firebase_admin.initialize_app(cred, {
    'databaseURL': "https://facerecognition-a185f-default-rtdb.firebaseio.com/"
})

ref = db.reference('Pedestrain')

def point_inside_polygon(x, y, poly):
    n = len(poly)
    inside = True

    p1x, p1y = poly[0]
    for i in range(n+1):
        p2x, p2y = poly[i % n]
        if y > min(p1y, p2y):
            if y <= max(p1y, p2y):
                if x <= max(p1x, p2x):
                    if p1y != p2y:
                        xinters = (y - p1y) * (p2x - p1x) / (p2y - p1y) + p1x
                    if p1x == p2x or x <= xinters:
                        inside = not inside
        p1x, p1y = p2x, p2y

    return inside

cap = cv2.VideoCapture(r"C:\Users\PRATAP\Downloads\Dangerous Waiyaki Way_ How pedestrians are risking their lives crossing 8-lane busy highway (online-video-cutter.com).mp4")

model_seg = YOLO('best (9).pt')
model_det = YOLO('yolov8x.pt')
print(model_det.model.names)

print(model_seg.model.names[3])

while True:
    ret, frame = cap.read()

    if not ret:
        break

    results_seg = model_seg.predict(frame)
    results_det = model_det.predict(frame)

    road_mask = None

    for result in results_seg:
        masks = result.masks
        print(masks)
        if (len(masks)>3):
            road_mask = masks[3][0]

    for result in results_det:
        boxes = result.boxes.cpu().numpy()
        for box in boxes:
            (x, y, w, h) = box.xyxy[0]

            b = box.xyxy[0].astype(int)
            c = int(box.cls[0])

            if c == 0 and road_mask:
                person_x = (x + w) / 2
                person_y = (y + h) / 2
                if point_inside_polygon(person_x, person_y,road_mask):
                    print("Vehicle inside road mask detected at:", person_x, person_y)
                    data = {"location":[lat,lon], "alert":"alert"}
                    ref.child("location1").set(data)
            else:
                data = {"location": [lat, lon], "alert": "normal"}
                ref.child("location1").set(data)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
