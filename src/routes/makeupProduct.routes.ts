import express from "express";
import { createMakeupProductHandler, getAllMakeupProductsHandler, getMakeupProductByCategoryHandler, uploadImagesHanlder } from "../controllers/makeup.controllers";
import { MakeupSchema } from "../schema/makeupProduct.schema";
import requestValidator from "../middlewares/requestValidator";
import { upload } from "../middlewares/multer.middleware";


const router = express.Router();

router.post("/create", upload, requestValidator(MakeupSchema), createMakeupProductHandler);
router.get("/", getMakeupProductByCategoryHandler);
router.get("/all", getAllMakeupProductsHandler);

export default router;