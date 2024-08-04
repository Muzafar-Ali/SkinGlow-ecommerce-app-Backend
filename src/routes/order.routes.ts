import express from "express";
import { createOrderWithoutUserHandler } from "../controllers/order.controllers";

const router = express.Router();

router.post("/orders", createOrderWithoutUserHandler)
router.post('/stripe-webhook', )

export default router;

