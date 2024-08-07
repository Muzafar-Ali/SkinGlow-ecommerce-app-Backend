import express from "express";
import { createOrderWithoutUserHandler, stripeWebhookHandler } from "../controllers/order.controllers";

const router = express.Router();

router.post("/orders", createOrderWithoutUserHandler)
router.post('/stripewebhook', express.raw({type: 'application/json'}), stripeWebhookHandler)

export default router;

