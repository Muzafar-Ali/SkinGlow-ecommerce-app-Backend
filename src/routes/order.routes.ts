import express from "express";
import { createOrderWithoutUserHandler } from "../controllers/order.controllers";

const router = express.Router();

router.post("/orders", createOrderWithoutUserHandler)
router.post('/stripewebhook',express.raw({type: 'application/json'}), )

export default router;

