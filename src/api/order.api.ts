import { OrderSheet, OrderListItem, OrderDetailItem } from "@/models/order.model";
import { requestHandler } from "./http";
import { ROUTES } from "../constants/routes";

// 주문 생성
export const order = async (orderData: OrderSheet) => {
    return await requestHandler<OrderSheet>("post", ROUTES.ORDER, orderData);
};

// 주문 내역 조회
export const fetchOrders = async () => {
    return await requestHandler<OrderListItem[]>("get", ROUTES.ORDER);
};

// 주문 상세 조회
export const fetchOrder = async (orderId: number) => {
    return await requestHandler<OrderDetailItem[]>("get", `${ROUTES.ORDER}/${orderId}`);
};