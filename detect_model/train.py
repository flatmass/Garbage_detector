import os
import cv2
import random
from detectron2.utils.logger import setup_logger
from detectron2 import model_zoo
from detectron2.utils.visualizer import Visualizer
from detectron2.data import DatasetCatalog, MetadataCatalog
from detectron2.config import get_cfg
from detectron2.data.datasets import register_coco_instances
from detectron2.engine import DefaultTrainer
from detectron2.evaluation import COCOEvaluator


setup_logger()


class CocoTrainer(DefaultTrainer):
    @classmethod
    def build_evaluator(cls, cfg, dataset_name, output_folder=None):
        if output_folder is None:
            os.makedirs("coco_eval", exist_ok=True)
            output_folder = "coco_eval"
        return COCOEvaluator(dataset_name, cfg, False, output_folder)


if __name__ == '__main__':
    register_coco_instances("my_dataset_train", {}, "/content/train/_annotations.coco.json", "/content/train")
    MetadataCatalog.get("my_dataset_train").set(thing_classes=["empty", "full"])
    board_metadata = MetadataCatalog.get("my_dataset_train")

    #Visualizing the Train Dataset
    dataset_dicts = DatasetCatalog.get("my_dataset_train")
    for d in random.sample(dataset_dicts, 3):
        img = cv2.imread(d["file_name"])
        visualizer = Visualizer(img[:, :, ::-1], metadata=board_metadata)
        vis = visualizer.draw_dataset_dict(d)
        cv2.imshow("Show", vis.get_image()[:, :, ::-1])
        cv2.waitkey(0)

    cfg = get_cfg()
    cfg.merge_from_file(model_zoo.get_config_file("COCO-Detection/faster_rcnn_R_50_FPN_3x.yaml"))

    cfg.DATASETS.TRAIN = ("my_dataset_train",)
    cfg.DATASETS.TEST = ("my_dataset_train",)

    cfg.DATALOADER.NUM_WORKERS = 4
    cfg.MODEL.WEIGHTS = model_zoo.get_checkpoint_url("COCO-Detection/faster_rcnn_R_50_FPN_3x.yaml")

    cfg.SOLVER.IMS_PER_BATCH = 4
    cfg.SOLVER.BASE_LR = 0.0125
    cfg.SOLVER.MAX_ITER = 1500
    cfg.MODEL.ROI_HEADS.BATCH_SIZE_PER_IMAGE = 256
    cfg.MODEL.ROI_HEADS.NUM_CLASSES = 2
    cfg.TEST.EVAL_PERIOD = 500
    os.makedirs(cfg.OUTPUT_DIR, exist_ok=True)
    trainer = CocoTrainer(cfg)
    trainer.resume_or_load(resume=False)
    trainer.train()

