import express from "express";
import { createMakeupProductHandler, getAllMakeupProductsHandler, getMakeupProductByCategoryHandler } from "../controllers/makeup.controllers";
import { MakeupSchema } from "../schema/makeupProduct.schema";
import requestValidator from "../middlewares/requestValidator";


const router = express.Router();

router.post("/create", requestValidator(MakeupSchema), createMakeupProductHandler);
router.get("/", getMakeupProductByCategoryHandler);
router.get("/all", getAllMakeupProductsHandler);

export default router;