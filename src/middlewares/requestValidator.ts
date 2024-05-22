import { AnyZodObject } from "zod";
import { Request, Response, NextFunction } from "express";

function requestValidator(schema: AnyZodObject) {
  return function (req: Request, res: Response, next: NextFunction) {
    try {
      const validatedData = schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      req.body = validatedData.body;
      req.query = validatedData.query;
      req.params = validatedData.params;

      next();
    } catch (error: any) {
      console.log("validateSchema error", error);
      const messages = error.errors.map((item: any) => item.message);
      return res.status(400).json({ errors: messages });
    }
  };
}


export default requestValidator;
