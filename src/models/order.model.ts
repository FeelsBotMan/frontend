// 주문 정보
export interface Order {
    id: number;
    createdAt: string;
    address: string;
    receiver: string;
    contact: string;
    bookTitle: string;  // 대표 주문 도서명
    totalQuantity: number;
    totalPrice: number;
}

// 주문 생성 정보
export interface OrderSheet {
    items: number[];  // 주문한 도서의 id 배열
    totalQuantity: number;
    totalPrice: number;
    firstBookTitle: string;
    delivery: Delivery;
}

// 배송 정보
export interface Delivery {
    address: string;
    receiver: string;
    contact: string;
}

// 주문 상세
export interface OrderDetailItem {
    bookId: number;
    title: string;
    author: string;
    price: number;
    quantity: number;
}

// 상세정보가 포함된 주문 정보
export interface OrderListItem extends Order {
    detail?: OrderDetailItem[];
}