import { AnyZodObject } from "zod";
import { Request, Response, NextFunction } from "express";
import { convertFormDataToNumber } from "../utils/helpers/convertFormDataToNumber";



function requestValidator(schema: AnyZodObject) {
  return function (req: Request, res: Response, next: NextFunction) {
    try {
      convertFormDataToNumber(req.body);

      // Parse JSON string in categories to satisify zod validation
      try {
        const parsedCategories = JSON.parse(req.body.categories || "{}"); // Handle empty categories
        req.body.categories = parsedCategories;
      } catch (error) {
        console.error("Invalid JSON format for categories field:", error);
        return res.status(400).json({ errors: ["Invalid JSON format for categories"] });
      }

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
