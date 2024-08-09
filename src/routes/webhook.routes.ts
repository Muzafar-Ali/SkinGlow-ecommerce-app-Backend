import express from "express";
import { stripeWebhookHandler } from "../controllers/order.controllers";

const router = express.Router();

router.post("/stripewebhook", express.raw({type: 'application/json'}), stripeWebhookHandler)

export default router;

