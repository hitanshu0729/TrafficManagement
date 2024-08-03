from ultralytics import YOLO
import supervision as sv
import cv2
import cvzone
import numpy as np
import torch
from ultralytics.utils.plotting import Annotator
import time

import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

cred = credentials.Certificate("facerecognition-a185f-firebase-adminsdk-88h36-3345fd9d69.json")
firebase_admin.initialize_app(cred, {
    'databaseURL': "https://facerecognition-a185f-default-rtdb.firebaseio.com/"
})

ref = db.reference('Traffic')

VIDEOPATH = r"C:\Users\PRATAP\Downloads\30 Minutes of Cars Driving By in 2009 (online-video-cutter.com).mp4"
CCTV_RTSP = ''
TIMER = 5  # Seconds
vehicle_LIMIT = 5

vehicle_detector = YOLO('yolov8x.pt')

video = cv2.VideoCapture(VIDEOPATH)

# fpsReader = cvzone.FPS()

box_annotator = sv.BoxAnnotator(
    thickness=2,
    text_thickness=2,
    text_scale=1
)

alertStatus=["Warn","Normal"]

class_list = vehicle_detector.model.names
classes = ['bicycle','car','motorcycle','bus','truck']
prev = time.time()

while True:

    ret, frame = video.read()

    if not ret:
        continue

    height, width = frame.shape[:2]
    cv2.namedWindow('Vehicle Counting', cv2.WINDOW_NORMAL)
    cv2.resizeWindow('Vehicle Counting', 1680, 945)

    # fps, frame = fpsReader.update(frame, pos=(15, 30), color=(0, 255, 0), scale=2, thickness=2)

    annotator = Annotator(frame)
    vehicle_detections = vehicle_detector.predict(frame,conf = 0.05, vid_stride=10)
    vehicleCount = {class_name: 0 for class_name in classes}  # Initialize count for each class to

    frame = cv2.line(frame, (1,500), (600,500), (255,0,0),3, 1)
    frame = cv2.line(frame, (600, 500), (1600, 500), (255, 0, 0), 3, 1)

    flag = 1

    for result in vehicle_detections:
        boxes = result.boxes.cpu().numpy()

        for box in boxes:
            (x, y, w, h) = box.xyxy[0]

            cx = int((x + w) / 2)
            cy = int((y + h) / 2)
            cy_bot = int(h)

            b = box.xyxy[0].astype(int)
            c = int(box.cls[0])
            class_names = class_list[int(c)]

            if class_names in classes:
                vehicleCount[class_names] += 1  # Increment count for detected class
                # cv2.circle(frame, (int(x), int(y)),7,(255,0,0),2)
                # cv2.circle(frame, (int(w), int(h)), 7, (255, 0, 0), 2)
                if ((h)>500):
                    annotator.box_label(b, color=(0, 0, 255))
                    flag=0
                    cv2.putText(frame, "ALERT", (200,200),2,2,(0,0,255),2)
                else:
                    annotator.box_label(b, color=(255, 0, 0))


    # Display count for each class
    y_pos = 50
    for class_name in classes:
        cvzone.putTextRect(frame, '{}: {}'.format(class_name, vehicleCount[class_name]), (200, y_pos), 1, thickness=2,
                           colorT=(255, 255, 255), colorR=(0, 0, 0), font=cv2.FONT_HERSHEY_PLAIN)
        y_pos += 30

    # Update Firebase database with counts
    # Update Firebase database with counts

    total_vehicle = 0
    for i in vehicleCount.values():
        total_vehicle+=i
    print(total_vehicle)

    data = {"vehiclecount": {class_name: vehicleCount[class_name] for class_name in classes}, "alertStatus":alertStatus[flag] , "location":[25.4358,81.8463],"Total":total_vehicle }
    ref.child("location1").set(data)


    cv2.imshow('Vehicle Counting', frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

video.release()
cv2.destroyAllWindows()
