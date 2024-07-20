import express from "express";
import { MakeupSchema } from "../schema/makeupProduct.schema";
import requestValidator from "../middlewares/requestValidator";
import { upload } from "../middlewares/multer.middleware";
import { 
  createMakeupProductHandler, 
  getAllMakeupProductsHandler, 
  getMakeupProductByCategoryHandler, 
  getSingleMakeupProductHandler
} from "../controllers/makeup.controllers";


const router = express.Router();

router.post("/create", upload, requestValidator(MakeupSchema), createMakeupProductHandler);
router.get("/", getMakeupProductByCategoryHandler);
router.get("/all", getAllMakeupProductsHandler);
router.get("/:slug", getSingleMakeupProductHandler)

export default router;