import { Express } from "express";
import { createMakeupProductHandler, getMakeupProductByCategoryHandler } from "./controllers/makeup.controllers";
import {
  createCheekMakeupCategoryHandler,
  createEyesMakeupCategoryHandler,
  createFeaturedCategoryHandler,
  createLipsMakeupCategoryHandler,
  getCheekMakeupCategoryHandler,
  getEyesMakeupCategoryHandler,
  getLipsMakeupCategoryHandler,
} from "./controllers/category.controllers";
import { MakeupSchema } from "./schema/makeupProduct.schema";
import { CheekMakeupShcema, EyesMakeupSchema, FeaturedSchema, LipsMakeupSchema } from "./schema/category.schema";
import requestValidator from "./middlewares/requestValidator";

export const routes = async (app: Express) => {
  // makeup routes
  // app.post("/api/v1/makeup/create", requestValidator(MakeupSchema), createMakeupProductHandler);
  // app.get("/api/v1/makeup/all");
  // app.get("/api/v1/makeup", getMakeupProductByCategoryHandler);

  //category routes
  app.post("/api/v1/category/featured/create", requestValidator(FeaturedSchema), createFeaturedCategoryHandler);
};
