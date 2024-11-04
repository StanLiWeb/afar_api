import express from "express";
import { createOrder, deleteOrder, getAllOrders, getOrder, handlerOrderCancellation, handlerOrderReturn, handlerOrderStatus, updateOrder, updateOrderStatus } from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/", createOrder);
orderRouter.get("/all", getAllOrders);
orderRouter.get("/:id", getOrder);
orderRouter.put("/:id", updateOrder);
orderRouter.delete("/:id", deleteOrder);
orderRouter.patch("/:id/status", updateOrderStatus);
orderRouter.patch("/:id/cancel", handlerOrderCancellation);
orderRouter.patch("/:id/return", handlerOrderReturn);
orderRouter.patch("/:id/return/status", handlerOrderStatus);

export default orderRouter;