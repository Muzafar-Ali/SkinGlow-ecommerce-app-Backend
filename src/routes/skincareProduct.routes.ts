import express from "express";
import requestValidator from "../middlewares/requestValidator";
import { SkincareSchema } from "../schema/skincareProduct.schema";
import { upload } from "../middlewares/multer.middleware";
import { 
  createSkincareProductHandler, 
  getAllSkincareProductHandler, 
  getSingleSkincareProductHandler, 
  getSkincareProductCollectionHandler 
} from "../controllers/skincare.controllers";

const router = express.Router();

router.post("/create", upload, requestValidator(SkincareSchema), createSkincareProductHandler);
router.get("/all", getAllSkincareProductHandler);
router.get("/collection", getSkincareProductCollectionHandler);
router.get("/:slug", getSingleSkincareProductHandler)


export default router;
