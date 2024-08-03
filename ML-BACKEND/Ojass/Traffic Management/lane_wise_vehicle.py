import cv2
from ultralytics import YOLO
import cvzone
import time

def line_intersect(line1_start, line1_end, line2_start, line2_end):
    """Check if two lines intersect."""
    x1, y1 = line1_start
    x2, y2 = line1_end
    x3, y3 = line2_start
    x4, y4 = line2_end

    # Calculate the determinants
    det1 = (x1 - x2) * (y3 - y4)
    det2 = (y1 - y2) * (x3 - x4)

    # Calculate the intersection point
    intersect_x = (det1 * (x3 - x4) - (x1 - x2) * det2) / (det1 + det2)
    intersect_y = (det1 * (y3 - y4) - (y1 - y2) * det2) / (det1 + det2)

    # Check if the intersection point is within the line segments
    if (min(x1, x2) <= intersect_x <= max(x1, x2) and
        min(y1, y2) <= intersect_y <= max(y1, y2) and
        min(x3, x4) <= intersect_x <= max(x3, x4) and
        min(y3, y4) <= intersect_y <= max(y3, y4)):
        return True
    else:
        return False


VIDEOPATH = r"C:\Users\PRATAP\Downloads\videoplayback.mp4"
vehicle_detector = YOLO('yolov8x.pt')
video = cv2.VideoCapture(VIDEOPATH)

# Define two lines for incoming and outgoing vehicles
line_in = [(320, 0), (0, 240)]  # Line for incoming vehicles
line_out = [(640, 240), (320, 480)]  # Line for outgoing vehicles

alertStatus=["Warn", "Normal"]

class_list = vehicle_detector.model.names
classes = ['bicycle', 'car', 'motorcycle', 'bus', 'truck']
prev = time.time()

# Initialize counters for incoming and outgoing vehicles
incoming_count = 0
outgoing_count = 0

while True:
    ret, frame = video.read()

    if not ret:
        continue

    # Resize the frame
    frame = cv2.resize(frame, (640, 480))

    vehicleCount = {class_name: 0 for class_name in classes}  # Initialize count for each class

    # Draw the incoming and outgoing lines
    cv2.line(frame, line_in[0], line_in[1], (255, 0, 0), 3)
    cv2.line(frame, line_out[0], line_out[1], (255, 0, 0), 3)

    vehicle_detections = vehicle_detector.predict(source=frame, conf = 0.05)

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

                # Check if the vehicle is crossing the incoming or outgoing lines
                if line_intersect((x, y), (x+w, y+h), line_in[0], line_in[1]):
                    incoming_count += 1
                    print("Vehicle incoming")
                elif line_intersect((x, y), (x+w, y+h), line_out[0], line_out[1]):
                    outgoing_count += 1
                    print("Vehicle outgoing")

                # Draw bounding boxes
                cv2.rectangle(frame, (b[0], b[1]), (b[2], b[3]), (255, 0, 0), 2)

    # Display count for each class
    y_pos = 50
    for class_name in classes:
        cv2.putText(frame, '{}: {}'.format(class_name, vehicleCount[class_name]), (200, y_pos), cv2.FONT_HERSHEY_PLAIN, 1, (255, 255, 255), 2)
        y_pos += 30

    # Display incoming and outgoing vehicle counts
    cv2.putText(frame, 'Incoming: {}'.format(incoming_count), (200, y_pos), cv2.FONT_HERSHEY_PLAIN, 1, (255, 255, 255), 2)
    y_pos += 30
    cv2.putText(frame, 'Outgoing: {}'.format(outgoing_count), (200, y_pos), cv2.FONT_HERSHEY_PLAIN, 1, (255, 255, 255), 2)

    cv2.imshow('Vehicle Counting', frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

video.release()
cv2.destroyAllWindows()
