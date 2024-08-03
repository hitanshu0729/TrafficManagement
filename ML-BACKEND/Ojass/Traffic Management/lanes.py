import cv2
import numpy as np

# Function to detect lanes using Hough Transform
def detect_lanes(image):
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    edges = cv2.Canny(gray, 50, 150)
    lines = cv2.HoughLinesP(edges, 1, np.pi / 180, threshold=100, minLineLength=100, maxLineGap=50)
    return lines

# Function to segment lanes and count vehicles in each lane
def count_vehicles_in_lanes(image, lanes):
    # Define ROIs for different lanes (you need to adjust these based on your video)
    left_lane_roi = np.array([[(0, image.shape[0]), (image.shape[1] // 2, image.shape[0] // 2),
                               (image.shape[1] // 2, image.shape[0]), (0, image.shape[0])]], dtype=np.int32)
    right_lane_roi = np.array([[(image.shape[1] // 2, image.shape[0]), (image.shape[1] // 2, image.shape[0] // 2),
                                (image.shape[1], image.shape[0]), (image.shape[1], image.shape[0])]], dtype=np.int32)

    # Mask the lanes
    left_lane_mask = np.zeros_like(image)
    right_lane_mask = np.zeros_like(image)
    cv2.fillPoly(left_lane_mask, left_lane_roi, (255, 255, 255))
    cv2.fillPoly(right_lane_mask, right_lane_roi, (255, 255, 255))

    # Initialize counts for each lane
    left_lane_count = 0
    right_lane_count = 0

    # Iterate through detected lanes
    if lanes is not None:
        for line in lanes:
            x1, y1, x2, y2 = line[0]
            slope = (y2 - y1) / (x2 - x1)

            if slope < 0:  # Left lane
                left_lane_count += 1
                cv2.line(left_lane_mask, (x1, y1), (x2, y2), (0, 255, 0), 3)
            elif slope > 0:  # Right lane
                right_lane_count += 1
                cv2.line(right_lane_mask, (x1, y1), (x2, y2), (0, 255, 0), 3)

    return left_lane_mask, right_lane_mask, left_lane_count, right_lane_count

# Load the video
video_path = r"C:\Users\PRATAP\Downloads\30 Minutes of Cars Driving By in 2009 (online-video-cutter.com).mp4"
cap = cv2.VideoCapture(video_path)

while True:
    ret, frame = cap.read()
    if not ret:
        break

    # Detect lanes
    detected_lanes = detect_lanes(frame)

    # Count vehicles in lanes
    left_lane_mask, right_lane_mask, left_lane_count, right_lane_count = count_vehicles_in_lanes(frame, detected_lanes)

    # Display lane masks and vehicle counts
    cv2.imshow("Left Lane Mask", left_lane_mask)
    cv2.imshow("Right Lane Mask", right_lane_mask)
    print("Left Lane Vehicle Count:", left_lane_count)
    print("Right Lane Vehicle Count:", right_lane_count)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
