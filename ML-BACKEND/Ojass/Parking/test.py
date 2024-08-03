from ultralytics import YOLO
model = YOLO('best (10).pt')

model.predict(source=r"C:\Users\PRATAP\Downloads\videoplayback (1).mp4", show=True)