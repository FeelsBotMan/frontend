import { useEffect, useState } from "react";
import { OrderListItem } from "../models/order.model";
import { fetchOrder, fetchOrders } from "../api/order.api";

export const useOrders = () => {
    const [orders, setOrders] = useState<OrderListItem[]>([]);
    const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

    useEffect(() => {
        fetchOrders()
            .then(setOrders)
            .catch(error => {
                // 에러 처리
                console.error('Failed to fetch orders:', error);
            });
    }, []);

    const selectOrderItem = (orderId: number) => {
        // 요청 방어
        if (orders.filter((item) => item.id === orderId)[0].detail) {
            setSelectedItemId(orderId);
            return;
        }

        // 주문 상세 조회
        fetchOrder(orderId).then((orderDetail) => {
            setSelectedItemId(orderId);
            setOrders(
                orders.map((item) => {
                    if (item.id === orderId) {
                        return {
                            ...item,
                            detail: orderDetail,
                        };
                    }
                    return item;
                })
            );
        });
    };

    return { orders, selectedItemId, selectOrderItem };
};