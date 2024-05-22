// import ErrorHandler from "./errorClass";

// type Category = {
//     name: string;
//     slug?: string;
// }

// class CreateCategory {
//     private categoryModel: any; // Replace with your actual category model
  
//     constructor(categoryModel: any) {
//       this.categoryModel = categoryModel;
//     }
  
//     async createCategory(categoryData: Category): Promise<Category> {
//       try {
//         const { name } = categoryData;
  
//         if (!name) throw new ErrorHandler(400, "input field missing");
  
//         const existingCategory = await this.categoryModel.findOne({ name });
//         if (existingCategory) throw new ErrorHandler(400, "Category already exists");
  
//         const category = await this.categoryModel.create(categoryData);
//         if (!category) throw new ErrorHandler(500, "Category not created");
  
//         return category;
//       } catch (error) {
//         throw error;
//       }
//     }
  
//     async getAllCategories(): Promise<Category[]> {
//       try {
//         const categories = await this.categoryModel.find({});
//         if (!categories) throw new ErrorHandler(404, "Categories not found");
//         return categories;
//       } catch (error) {
//         throw error;
//       }
//     }
//   }



//   export const createCheekMakeupCategoryHandler = async (
//     req: Request<{}, {}, Category>, // Update request body type
//     res: Response,
//     next: NextFunction
//   ) => {
//     try {
//       const categoryService = new CategoryService(CheekMakeupCategory); // Inject CheekMakeupCategory model
//       const category = await categoryService.createCategory(req.body);
  
//       res.status(201).json({
//         success: true,
//         category,
//       });
//     } catch (error) {
//       console.log("createCheekMakeupCategoryHandler", error);
//       next(error);
//     }
//   };

//   export default CreateCategory;
  
  