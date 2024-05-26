import express from 'express'
import { connectDB } from './utils/helper';
import { routes } from './routes';
import morgan from 'morgan';
import { errorMiddleware } from './middlewares/error.middleware';
import cors from 'cors';

// importing routes
import makeupRoute from './routes/makeupProduct.routes'
import skincareRoute from './routes/skincareProduct.routes';
import makeupCategoryRoute from './routes/categoryMakeup.routes';
import skincareCategoryRoute from './routes/categorySkincare.routes';
import featuredCategoryRoute from './routes/categoryFeatured.routes';

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(morgan("dev"))

const port = 4000;

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Runnig succesfully'
  })
});

// Using Routes  
   
// product routes
app.use("/api/v1/makeup", makeupRoute)
app.use("/api/v1/skincare", skincareRoute)

// category routes
app.use("/api/v1/makeup/category", makeupCategoryRoute)
app.use("/api/v1/skincare/category", skincareCategoryRoute)
app.use("/api/v1/category", featuredCategoryRoute)


app.use(errorMiddleware)

app.listen(port, async () => {
  await connectDB();
  console.log(`Example app listening on port ${port}`);
});