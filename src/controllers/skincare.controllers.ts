import { NextFunction, Request, Response } from "express";
import { createSkincareProduct } from "../services/skincareProduct.services";
import { SkincareSchemaType } from "../schema/skincareProduct.schema";

export const createSkincareProductHandler = async (
  req: Request<{}, {}, SkincareSchemaType["body"]>,
  res: Response,
  next: NextFunction
) => {
  try {
    await createSkincareProduct(req.body);

    res.status(201).json({
      success: true,
      message: "product created successfuly",
    });
  } catch (error) {
    console.log("createSkincareProductHandler error: ", error);
    next(error);
  }
};
