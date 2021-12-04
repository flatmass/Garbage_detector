import os
import cv2
import random
from detectron2.utils.logger import setup_logger
from detectron2.utils.visualizer import ColorMode
from detectron2.data import DatasetCatalog, MetadataCatalog
from detectron2 import model_zoo
from detectron2.engine import DefaultPredictor
from detectron2.config import get_cfg
from detectron2.utils.visualizer import Visualizer
from detectron2.data.datasets import register_coco_instances


setup_logger()


if __name__ == '__main__':
    register_coco_instances("my_dataset_train", {}, "/content/train/_annotations.coco.json", "/content/train")
    cfg = get_cfg()

    cfg.merge_from_file(model_zoo.get_config_file("COCO-Detection/faster_rcnn_R_50_FPN_3x.yaml"))

    cfg.DATASETS.TRAIN = ("my_dataset_train",)
    cfg.DATASETS.TEST = ("my_dataset_train",)

    cfg.MODEL.WEIGHTS = os.path.join(cfg.OUTPUT_DIR, "model_final.pth")

    cfg.MODEL.ROI_HEADS.SCORE_THRESH_TEST = 0.8  # set the testing threshold for this model

    predictor = DefaultPredictor(cfg)

    dataset_dicts = DatasetCatalog.get("my_dataset_train")
    board_metadata = MetadataCatalog.get("my_dataset_train")

    for d in random.sample(dataset_dicts, 3):
        im = cv2.imread(d["file_name"])
        outputs = predictor(im)
        v = Visualizer(im[:, :, ::-1],
                       metadata=board_metadata,
                       scale=0.8,
                       instance_mode=ColorMode.IMAGE
        )
        v = v.draw_instance_predictions(outputs["instances"].to("cpu")) #Passing the predictions to CPU from the GPU
        cv2.imshow("test", v.get_image()[:, :, ::-1])