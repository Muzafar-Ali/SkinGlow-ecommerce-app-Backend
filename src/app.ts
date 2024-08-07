import express from 'express'
import morgan from 'morgan';
import cors from 'cors';
import { errorMiddleware } from './middlewares/error.middleware';
import { connectDB } from './utils/connectDB';

// Importing routes
import makeupRoute from './routes/makeupProduct.routes'
import skincareRoute from './routes/skincareProduct.routes';
import makeupCategoryRoute from './routes/categoryMakeup.routes';
import skincareCategoryRoute from './routes/categorySkincare.routes';
import searchRoutes from './routes/search.routes';
import orderRoutes from './routes/order.routes';
import config from './config/config';

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(morgan("dev"))

const port = config.port || 4000;

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Runnig succesfully'
  })
});

// product routes
app.use("/v1/makeup", makeupRoute)
app.use("/v1/skincare", skincareRoute)

// category routes
app.use("/v1/makeup/category", makeupCategoryRoute)
app.use("/v1/skincare/category", skincareCategoryRoute)

// search routes
app.use("/v1", searchRoutes)

// orders routes
app.use("/v1", orderRoutes)

// Error middleware
app.use(errorMiddleware)

app.listen(port, async () => {
  await connectDB();
  console.log(`Example app listening on port ${port}`);
});