from ultralytics import YOLO

VIDEOPATH  = r"C:\Users\PRATAP\Downloads\Dangerous Waiyaki Way_ How pedestrians are risking their lives crossing 8-lane busy highway (online-video-cutter.com).mp4"

model = YOLO('best (9).pt')

model.predict(source=VIDEOPATH, show=True)

